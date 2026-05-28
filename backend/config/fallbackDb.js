import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.VERCEL ? '/tmp/gk-fit-data' : path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class FallbackCollection {
  constructor(name) {
    this.name = name;
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  read() {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
      }
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error(`Error reading fallback DB file: ${this.filePath}`, e);
      return [];
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`Error writing fallback DB file: ${this.filePath}`, e);
    }
  }

  async find(query = {}) {
    const items = this.read();
    if (Object.keys(query).length === 0) return items;
    return items.filter(item => {
      for (let key in query) {
        if (query[key] && typeof query[key] === 'object' && query[key].$in) {
          if (!query[key].$in.includes(item[key])) return false;
        } else if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(query = {}) {
    const items = await this.find(query);
    return items[0] || null;
  }

  async findById(id) {
    if (!id) return null;
    return this.findOne({ _id: id.toString() });
  }

  async create(data) {
    const items = this.read();
    const newItem = {
      _id: Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    items.push(newItem);
    this.write(items);
    return newItem;
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    if (!id) return null;
    const items = this.read();
    const idx = items.findIndex(item => item._id === id.toString());
    if (idx === -1) return null;
    
    // Support Mongoose $set or direct update
    const actualUpdates = updateData.$set ? updateData.$set : updateData;

    items[idx] = {
      ...items[idx],
      ...actualUpdates,
      updatedAt: new Date().toISOString()
    };
    this.write(items);
    return items[idx];
  }

  async findOneAndUpdate(query, updateData, options = {}) {
    const items = this.read();
    let foundIdx = -1;
    for (let i = 0; i < items.length; i++) {
      let matches = true;
      for (let key in query) {
        if (items[i][key] !== query[key]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        foundIdx = i;
        break;
      }
    }

    const actualUpdates = updateData.$set ? updateData.$set : updateData;

    if (foundIdx === -1) {
      if (options.upsert) {
        return this.create({ ...query, ...actualUpdates });
      }
      return null;
    }

    items[foundIdx] = {
      ...items[foundIdx],
      ...actualUpdates,
      updatedAt: new Date().toISOString()
    };
    this.write(items);
    return items[foundIdx];
  }

  async insertMany(dataArray) {
    const items = this.read();
    const seeded = dataArray.map(data => ({
      _id: Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    }));
    const newItems = [...items, ...seeded];
    this.write(newItems);
    return seeded;
  }

  async countDocuments(query = {}) {
    const items = await this.find(query);
    return items.length;
  }
}

export const fallbackDb = {
  users: new FallbackCollection('users'),
  workouts: new FallbackCollection('workouts'),
  foods: new FallbackCollection('foods'),
  intakes: new FallbackCollection('intakes'),
  progress: new FallbackCollection('progress'),
  fitFormHistory: new FallbackCollection('fitFormHistory')
};
