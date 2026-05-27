export const exerciseVideoDatabase = {
  // === CHEST ===
  "push-up": {
    id: "push-up",
    name: "Push-Up",
    category: "CHEST",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
    correctForm: ["Maintain a rigid plank line from head to heels.", "Keep elbows tucked at a 45-degree angle."],
    commonMistakes: ["Sagging hips / Lumbar hyperextension", "Elbow flaring to 90 degrees"],
    postureTips: ["Screw your hands into the ground to lock your shoulders.", "Engage glutes and brace core."],
    angles: { knee: "170°–180°", elbow: "70°–90° (Bottom)", hip: "170°–180°", shoulder: "45°–60° Abduction" },
    safetyTips: "If your core sags, elevate your hands on a bench rather than compromising your lumbar spine."
  },
  "incline-push-up": {
    id: "incline-push-up",
    name: "Incline Push-Up",
    category: "CHEST",
    videoUrl: "https://www.youtube.com/embed/Me9V7gG9Rco",
    correctForm: ["Place hands on a secure elevated platform.", "Lower chest to the platform edge.", "Keep body entirely straight."],
    commonMistakes: ["Hips hiking upward", "Bouncing the chest off the platform"],
    postureTips: ["Drive through your palms evenly.", "Keep your neck fully neutral."],
    angles: { knee: "170°–180°", elbow: "75°–90° (Bottom)", hip: "170°–180°", shoulder: "45°–60° Abduction" },
    safetyTips: "Ensure the elevated surface is perfectly stable and locked against a wall before adding weight load."
  },
  "bench-press": {
    id: "bench-press",
    name: "Bench Press",
    category: "CHEST",
    videoUrl: "https://www.youtube.com/embed/vcBig73ojpE",
    correctForm: ["Maintain 5-point contact: head, upper back, glutes, and both feet.", "Retract your scapula.", "Lower bar to mid-chest."],
    commonMistakes: ["Lifting glutes off the bench", "Bouncing bar off the ribs", "Flaring elbows widely"],
    postureTips: ["Drive feet hard into the floor to create horizontal leg drive.", "Squeeze the bar tightly."],
    angles: { knee: "80°–100°", elbow: "75°–85° (Bottom)", hip: "130°–150°", shoulder: "45°–70° Abduction" },
    safetyTips: "Always wrap your thumb completely around the bar; never use a suicide grip."
  },
  "incline-bench-press": {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    category: "CHEST",
    videoUrl: "https://www.youtube.com/embed/8iPvtM70z84",
    correctForm: ["Set bench to 30–45 degrees.", "Lower bar smoothly to your upper chest/clavicle.", "Keep forearms perfectly vertical."],
    commonMistakes: ["Using an excessively steep bench angle", "Severe spinal arching that flattens the movement"],
    postureTips: ["Keep upper back pinned deeply into the pad.", "Press bar up and slightly backward."],
    angles: { knee: "80°–100°", elbow: "70°–85° (Bottom)", hip: "100°–120°", shoulder: "50°–65° Abduction" },
    safetyTips: "Stop the descent if you feel any acute sharpness in the front of the shoulder capsule."
  },
  "chest-fly": {
    id: "chest-fly",
    name: "Chest Fly",
    category: "CHEST",
    videoUrl: "https://www.youtube.com/embed/eGjt4lk6gJw",
    correctForm: ["Lie flat, holding dumbbells in a wide arc.", "Maintain a fixed micro-bend in elbows.", "Bring weights together using chest contraction."],
    commonMistakes: ["Turning the fly into a press at the bottom", "Dropping elbows significantly lower than bench level"],
    postureTips: ["Visualize hugging a massive tree trunk.", "Keep shoulder blades retracted throughout."],
    angles: { knee: "80°–100°", elbow: "140°–155° (Fixed)", hip: "130°–150°", shoulder: "85°–95° Max Abduction" },
    safetyTips: "Stop the downward stretch when your elbows reach the plane of your torso to prevent injury."
  },

  // === BACK ===
  "pull-up": {
    id: "pull-up",
    name: "Pull-Up",
    category: "BACK",
    videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
    correctForm: ["Hang fully with an overhand grip.", "Drive your elbows directly down into your ribs.", "Clear the bar with your chin cleanly."],
    commonMistakes: ["Using leg momentum or kipping", "Shrugging shoulders up into the neck", "Incomplete bottom extension"],
    postureTips: ["Depress your scapula before your arms start to pull.", "Keep legs unified and core braced."],
    angles: { knee: "170°–180°", elbow: "35°–50° (Top)", hip: "165°–180°", shoulder: "30°–45° Adduction" },
    safetyTips: "Avoid crossing your legs loosely if it causes your hips to twist or swing continuously."
  },
  "lat-pulldown": {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "BACK",
    videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc",
    correctForm: ["Grip bar wider than shoulders.", "Lean back slightly (10-15 degrees).", "Pull bar cleanly to your upper chest."],
    commonMistakes: ["Pulling bar down behind the neck", "Leaning back excessively to rely on momentum"],
    postureTips: ["Lead with your elbows, not your hands.", "Control the weight completely on the way up."],
    angles: { knee: "85°–95°", elbow: "35°–50° (Bottom)", hip: "100°–115°", shoulder: "30°–45° Adduction" },
    safetyTips: "Pulling behind the neck forces extreme external rotation; always pull down in front of your face."
  },
  "barbell-row": {
    id: "barbell-row",
    name: "Barbell Row",
    category: "BACK",
    videoUrl: "https://www.youtube.com/embed/6TGaHQgshDo",
    correctForm: ["Hinge at the hips to a 45-degree angle.", "Keep spine flat and neutral.", "Pull bar straight to your lower ribs."],
    commonMistakes: ["Rounding the lumbar spine", "Standing up too straight into a shrug", "Bouncing legs to pull"],
    postureTips: ["Keep your gaze directed diagonally down at the floor.", "Squeeze shoulder blades together at peak."],
    angles: { knee: "150°–165°", elbow: "50°–65° (Peak)", hip: "110°–130°", shoulder: "Extended past torso" },
    safetyTips: "If you feel lower back strain, check your core brace and ensure your spine isn't curving outwards."
  },
  "seated-cable-row": {
    id: "seated-cable-row",
    name: "Seated Cable Row",
    category: "BACK",
    videoUrl: "https://www.youtube.com/embed/GZbfZ033f74",
    correctForm: ["Sit tall with knees slightly bent.", "Pull handle to lower abdomen.", "Retract your shoulder blades smoothly."],
    commonMistakes: ["Aggressive forward/backward rocking", "Shrugging shoulders up toward ears"],
    postureTips: ["Keep your chest proud.", "Don't let the weight stack pull your shoulders out of alignment forcefully."],
    angles: { knee: "140°–160°", elbow: "45°–60° (Peak)", hip: "85°–105° Range", shoulder: "Tucked tight to ribs" },
    safetyTips: "Never lock your knees out straight against the footplates; preserve a soft, safe bend."
  },
  "deadlift": {
    id: "deadlift",
    name: "Deadlift",
    category: "BACK",
    videoUrl: "https://www.youtube.com/embed/op9kVnSso6Q",
    correctForm: ["Keep bar over mid-foot setup.", "Hinge hips deep, flatten back completely."],
    commonMistakes: ["Rounding the lower back", "Bar drifting away from shins"],
    postureTips: ["Pack your lats as if squeezing oranges in your armpits.", "Keep bar scraping your legs."],
    angles: { knee: "135°–145° (Start)", elbow: "175°–180° (Locked)", hip: "75°–95° (Start)", shoulder: "Slightly ahead of bar" },
    safetyTips: "Never flex your elbows to pull the weight; keep arms straight to safeguard your biceps tendons."
  },

  // === SHOULDERS ===
  "shoulder-press": {
    id: "shoulder-press",
    name: "Shoulder Press",
    category: "SHOULDERS",
    videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog",
    correctForm: ["Press straight overhead inline with ears.", "Keep your rib cage pulled down."],
    commonMistakes: ["Excessive lower back arching", "Flaring elbows completely flat to the sides"],
    postureTips: ["Keep your ribs pulled down and abs tight.", "Finish with weights directly inline with ears."],
    angles: { knee: "175°–180°", elbow: "60°–75° (Bottom)", hip: "170°–180°", shoulder: "Scapular Plane Tilt" },
    safetyTips: "Pressing 30 degrees forward in the scapular plane relieves shoulder impingement issues."
  },
  "arnold-press": {
    id: "arnold-press",
    name: "Arnold Press",
    category: "SHOULDERS",
    videoUrl: "https://www.youtube.com/embed/62Wni0N0S84",
    correctForm: ["Start with palms facing you at chest height.", "Rotate wrists out as you press up.", "Finish with palms facing forward at the top."],
    commonMistakes: ["Rotating too early at the bottom", "Leaning back excessively"],
    postureTips: ["Perform the rotation in one fluid, rhythmic motion.", "Keep core locked."],
    angles: { knee: "170°–180°", elbow: "45°–60° (Bottom)", hip: "100°–110° (Seated)", shoulder: "Multi-planar rotation" },
    safetyTips: "Use lighter weights than a conventional press to let rotator cuffs adapt to the rotation."
  },
  "lateral-raise": {
    id: "lateral-raise",
    name: "Lateral Raise",
    category: "SHOULDERS",
    videoUrl: "https://www.youtube.com/embed/3VcKaXatgfk",
    correctForm: ["Lean torso forward very slightly (5 degrees).", "Raise weights out wide to the sides.", "Lead the movement with your elbows."],
    commonMistakes: ["Swinging body back and forth", "Lifting hands higher than elbows"],
    postureTips: ["Think about pushing weights out away from you, not up.", "Keep shoulders down, do not shrug."],
    angles: { knee: "165°–175°", elbow: "150°–165° (Fixed)", hip: "165°–175°", shoulder: "85°–90° Max Abduction" },
    safetyTips: "Keep your wrists straight and avoid dropping the pinky side of your hands downward at the top."
  },
  "front-raise": {
    id: "front-raise",
    name: "Front Raise",
    category: "SHOULDERS",
    videoUrl: "https://www.youtube.com/embed/hRJ6_as46Gc",
    correctForm: ["Stand tall, raise weights directly in front.", "Maintain a soft micro-bend in elbows.", "Stop when arms are parallel to floor."],
    commonMistakes: ["Using aggressive hip sway to rock weights", "Raising hands far past eye level"],
    postureTips: ["Isolate the movement completely.", "Brace core heavily to stabilize spine."],
    angles: { knee: "170°–180°", elbow: "160°–170°", hip: "170°–180°", shoulder: "85°–95° Flexion" },
    safetyTips: "Lower the weight twice as slowly as you raised it to maximize muscle control."
  },
  "rear-delt-fly": {
    id: "rear-delt-fly",
    name: "Rear Delt Fly",
    category: "SHOULDERS",
    videoUrl: "https://www.youtube.com/embed/ttvfGg9d76c",
    correctForm: ["Hinge deeply at hips until torso is near parallel to floor.", "Raise arms out wide in a sweeping arc.", "Squeeze back of shoulders."],
    commonMistakes: ["Standing up midway through the set", "Bending elbows too much, turning it into a row"],
    postureTips: ["Keep neck neutral; look at floor.", "Lead with pinky fingers to activate rear delts."],
    angles: { knee: "145°–160°", elbow: "150°–165° (Fixed)", hip: "100°–115°", shoulder: "Horizontal Abduction" },
    safetyTips: "Distribute your weight evenly through your midfoot so you don't lose balance forward."
  },

  // === BICEPS ===
  "bicep-curl": {
    id: "bicep-curl",
    name: "Bicep Curl",
    category: "BICEPS",
    videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    correctForm: ["Keep elbows pinned strictly to ribs.", "Control the down phase fully."],
    commonMistakes: ["Swinging elbows forward using front delts", "Partial range of motion"],
    postureTips: ["Keep wrists rigid; don't curl them at the top.", "Keep shoulder blades locked back."],
    angles: { knee: "175°–180°", elbow: "170° to 30° Range", hip: "175°–180°", shoulder: "0°–10° Flexion (Static)" },
    safetyTips: "If you have to lean back to finish the repetition, the weight is too heavy. Lighten the load."
  },
  "hammer-curl": {
    id: "hammer-curl",
    name: "Hammer Curl",
    category: "BICEPS",
    videoUrl: "https://www.youtube.com/embed/XO77vHskS0g",
    correctForm: ["Maintain a strict neutral grip (palms facing each other).", "Curl weights up without twisting wrists.", "Keep upper arms completely stationary."],
    commonMistakes: ["Supinating the hands mid-rep", "Allowing elbows to flare outward away from sides"],
    postureTips: ["Squeeze the dumbbell handles firmly to increase forearm engagement."],
    angles: { knee: "175°–180°", elbow: "170° to 35° Range", hip: "175°–180°", shoulder: "Static 0°" },
    safetyTips: "Maintain a stable stance without rocking back and forth from your ankles."
  },
  "concentration-curl": {
    id: "concentration-curl",
    name: "Concentration Curl",
    category: "BICEPS",
    videoUrl: "https://www.youtube.com/embed/Jvj228VWiRE",
    correctForm: ["Sit on bench, anchor tricep against inner thigh.", "Curl dumbbell up toward face cleanly.", "Avoid using leg to push arm up."],
    commonMistakes: ["Allowing arm to slide off thigh", "Rounding spine aggressively to reach down"],
    postureTips: ["Keep the opposite hand on your knee for structural upper body bracing."],
    angles: { knee: "85°–95°", elbow: "165° to 30° Range", hip: "75°–90°", shoulder: "Fixed by thigh anchor" },
    safetyTips: "Curl the weight toward your shoulder line, not your chest, to maximize bicep contraction."
  },
  "preacher-curl": {
    id: "preacher-curl",
    name: "Preacher Curl",
    category: "BICEPS",
    videoUrl: "https://www.youtube.com/embed/vngli9UR6Hw",
    correctForm: ["Place arms flat against pad, armpits locked over top edge.", "Lower slowly to full extension.", "Curl up to 45 degrees, maintaining tension."],
    commonMistakes: ["Snapping/hyperextending elbows at bottom", "Lifting glutes off the seat to leverage weight"],
    postureTips: ["Stop just shy of absolute mechanical hyper-lockout at the bottom stretch."],
    angles: { knee: "90°", elbow: "165° to 45° Range", hip: "90°–110°", shoulder: "Fixed on pad" },
    safetyTips: "The bottom phase puts intense tension on the bicep tendon. Control the eccentric phase carefully."
  },

  // === TRICEPS ===
  "tricep-pushdown": {
    id: "tricep-pushdown",
    name: "Tricep Pushdown",
    category: "TRICEPS",
    videoUrl: "https://www.youtube.com/embed/6Fzep1VucA8",
    correctForm: ["Tuck elbows into sides.", "Push attachment down to full elbow lockout.", "Control return up to chest height."],
    commonMistakes: ["Letting elbows flare out widely", "Letting elbows drift up and down dynamically"],
    postureTips: ["Keep upper arms perfectly vertical and locked against ribs.", "Keep shoulders pulled back."],
    angles: { knee: "165°–175°", elbow: "80° to 175° Range", hip: "165°–175°", shoulder: "0°–10° (Static)" },
    safetyTips: "Stand close to the cable so the weight pulls upward, matching the triceps' track."
  },
  "overhead-tricep-extension": {
    id: "overhead-tricep-extension",
    name: "Overhead Tricep Extension",
    category: "TRICEPS",
    videoUrl: "https://www.youtube.com/embed/uGvV_Z6R60I",
    correctForm: ["Hold weight overhead, arms straight.", "Lower weight behind head by flexing elbows.", "Keep upper arms vertical near ears."],
    commonMistakes: ["Flaring elbows wide", "Flaring ribs and over-arching the lower back"],
    postureTips: ["Brace abs tight to keep your rib cage down and spine stable."],
    angles: { knee: "170°–180°", elbow: "165° to 60° Range", hip: "170°–180°", shoulder: "150°–170° Flexion" },
    safetyTips: "If overhead mobility is limited, switch to a cable version to relieve shoulder strain."
  },
  "bench-dips": {
    id: "bench-dips",
    name: "Bench Dips",
    category: "TRICEPS",
    videoUrl: "https://www.youtube.com/embed/0326meuDhZk",
    correctForm: ["Hands shoulder-width on bench edge.", "Lower hips by bending elbows to 90 degrees.", "Keep back skimming close to bench."],
    commonMistakes: ["Drifting forward away from bench", "Sinking too deep past 90 degrees"],
    postureTips: ["Keep shoulders depressed; do not let your ears sink into your shoulders."],
    angles: { knee: "130°–180°", elbow: "165° to 85° Range", hip: "90°–110°", shoulder: "Max 60° Extension" },
    safetyTips: "Stop right at 90 degrees of elbow bend to shield the front shoulder capsules."
  },
  "skull-crushers": {
    id: "skull-crushers",
    name: "Skull Crushers",
    category: "TRICEPS",
    videoUrl: "https://www.youtube.com/embed/l3rHYPtMUo8",
    correctForm: ["Lie flat, angle upper arms slightly backward (10–15°).", "Bend elbows to lower weight toward your hairline.", "Extend elbows cleanly back up."],
    commonMistakes: ["Moving upper arms back and forth like a pullover", "Flaring elbows to sides"],
    postureTips: ["Locking upper arms slightly backward keeps constant tension on the triceps at the top."],
    angles: { knee: "90°", elbow: "165° to 65° Range", hip: "130°–150°", shoulder: "95°–110° Fixed Angle" },
    safetyTips: "Lower the weight under total control to avoid hitting your forehead."
  },

  // === LEGS ===
  "squat": {
    id: "squat",
    name: "Squat",
    category: "LEGS",
    videoUrl: "https://www.youtube.com/embed/YaXPRqUwItQ",
    correctForm: ["Feet shoulder-width apart.", "Lower hip crease below the top of the knee."],
    commonMistakes: ["Knees caving inward (valgus)", "Heels lifting off the ground"],
    postureTips: ["Track knees in line with toes.", "Keep weight centered over midfoot."],
    angles: { knee: "175° to 75° Range", elbow: "Fixed", hip: "175° to 70° Range", shoulder: "Stable" },
    safetyTips: "Only squat as deep as you can maintain a flat, neutral spine."
  },
  "goblet-squat": {
    id: "goblet-squat",
    name: "Goblet Squat",
    category: "LEGS",
    videoUrl: "https://www.youtube.com/embed/MZM8R6Z689A",
    correctForm: ["Hold weight vertically against sternum.", "Squat deeply down between legs.", "Keep torso very upright."],
    commonMistakes: ["Letting weight pull upper back forward into a round", "Knees caving in"],
    postureTips: ["Track elbows inside your knees at the bottom of the movement."],
    angles: { knee: "175° to 70° Range", elbow: "Fixed Flexion", hip: "175° to 65° Range", shoulder: "Static" },
    safetyTips: "Keep the weight in contact with your body to avoid lower back fatigue."
  },
  "bulgarian-split-squat": {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    category: "LEGS",
    videoUrl: "https://www.youtube.com/embed/2C-uNgKwPLE",
    correctForm: ["One foot back on bench.", "Lower hips until front thigh is parallel to floor.", "Drive up through front heel."],
    commonMistakes: ["Front foot too close to bench", "Front knee caving inward laterally"],
    postureTips: ["A slight forward lean (15 degrees) safely increases glute loading."],
    angles: { knee: "Front: 80°–90° at bottom", elbow: "Static", hip: "Front: 70°–80° at bottom", shoulder: "Stable" },
    safetyTips: "Step out far enough so your front heel stays flat during the descent."
  },
  "lunges": {
    id: "lunges",
    name: "Lunges",
    category: "LEGS",
    videoUrl: "https://www.youtube.com/embed/COKYKgQ8KR0",
    correctForm: ["Step forward, lower hips until both knees are at 90°.", "Keep back knee hovering just off floor.", "Push back cleanly to start."],
    commonMistakes: ["Step too short causing heel lift", "Torso collapsing onto front thigh"],
    postureTips: ["Keep steps wide horizontally, like standing on train tracks, for balance."],
    angles: { knee: "Front & Back: 85°–95°", elbow: "Static", hip: "Front Hip: 80°–90°", shoulder: "Vertical" },
    safetyTips: "Brace your core to prevent side-to-side rocking as you step forward."
  },
  "leg-press": {
    id: "leg-press",
    name: "Leg Press",
    category: "LEGS",
    videoUrl: "https://www.youtube.com/embed/IZXwWwN_S_0",
    correctForm: ["Lower sled until knees reach 90 degrees.", "Keep lower back flat on pad.", "Press up without locking knees."],
    commonMistakes: ["Hyperextending/snapping knees at top", "Tailbone lifting off pad at bottom"],
    postureTips: ["Keep your feet planted flat; drive evenly across your midfoot."],
    angles: { knee: "165° to 85° Range", elbow: "Static", hip: "55°–70° (Bottom)", shoulder: "Supported" },
    safetyTips: "If your glutes lift off the pad at the bottom, stop your descent slightly earlier."
  },
  "romanian-deadlift": {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    category: "LEGS",
    videoUrl: "https://www.youtube.com/embed/hCDzSR6bW10",
    correctForm: ["Feet hip-width apart.", "Push hips back horizontally while keeping knees soft but fixed.", "Lower weight along shins."],
    commonMistakes: ["Squatting the weight down via active knee bending", "Rounding back to reach lower"],
    postureTips: ["The movement ends when your hips can no longer travel backward."],
    angles: { knee: "150°–165° (Fixed Soft Bend)", elbow: "175°–180°", hip: "175° to 90° Range", shoulder: "Lat Locked" },
    safetyTips: "Do not try to touch the floor; let hamstring flexibility dictate your depth."
  },
  "calf-raises": {
    id: "calf-raises",
    name: "Calf Raises",
    category: "LEGS",
    videoUrl: "https://www.youtube.com/embed/N-0L9vN7G9M",
    correctForm: ["Drive through big toes to lift heels fully.", "Hold peak contraction briefly.", "Lower fully to get a deep bottom stretch."],
    commonMistakes: ["Bouncing out of the bottom position rapidly", "Bending knees to assist"],
    postureTips: ["Keep knees completely locked to target the gastrocnemius muscle."],
    angles: { knee: "170°–180°", elbow: "Static", hip: "175°–180°", ankle: "Full Plantar/Dorsiflexion" },
    safetyTips: "Lightly hold a wall or rack for stability to maximize direct muscle output."
  },

  // === CORE ===
  "plank": {
    id: "plank",
    name: "Plank",
    category: "CORE",
    videoUrl: "https://www.youtube.com/embed/TvxNkmjDhMM",
    correctForm: ["Elbows directly under shoulders.", "Perfect straight line from head to heels.", "Brace core and tuck pelvis slightly."],
    commonMistakes: ["Sagging lower back/hips", "Poking glutes high up (pyramid position)"],
    postureTips: ["Actively pull your elbows toward your toes to maximize ab contraction."],
    angles: { knee: "175°–180°", elbow: "85°–95°", hip: "170°–180°", shoulder: "85°–95°" },
    safetyTips: "Gaze straight down between your forearms to maintain a neutral cervical spine."
  },
  "side-plank": {
    id: "side-plank",
    name: "Side Plank",
    category: "CORE",
    videoUrl: "https://www.youtube.com/embed/NXr4Fwku60Y",
    correctForm: ["Elbow directly beneath shoulder.", "Stack feet, lift hips to a straight line.", "Keep chest square to front."],
    commonMistakes: ["Bottom hip sagging down", "Torso twisting forward toward floor"],
    postureTips: ["Drive your bottom hip up toward the ceiling to lock out the obliques."],
    angles: { knee: "175°–180°", elbow: "85°–95°", hip: "170°–180°", shoulder: "85°–95°" },
    safetyTips: "Stagger your top foot in front of the bottom foot if stacking them causes ankle discomfort."
  },
  "crunches": {
    id: "crunches",
    name: "Crunches",
    category: "CORE",
    videoUrl: "https://www.youtube.com/embed/Xyd_fa5zoEU",
    correctForm: ["Lie on back, knees bent, feet flat.", "Flex thoracic spine to lift shoulder blades up.", "Keep lower back flat on ground."],
    commonMistakes: ["Yanking neck forward with hands", "Lifting lower back completely (sit-up)"],
    postureTips: ["Preserve a fist-sized gap between your chin and chest to safeguard your neck."],
    angles: { knee: "80°–90°", elbow: "Wide Open", hip: "45°–60°", shoulder: "Static" },
    safetyTips: "Focus on pulling your rib cage down toward your pelvis rather than lifting up high."
  },
  "bicycle-crunch": {
    id: "bicycle-crunch",
    name: "Bicycle Crunch",
    category: "CORE",
    videoUrl: "https://www.youtube.com/embed/Iwyvozckjak",
    correctForm: ["Shoulder blades lifted off floor.", "Rotate torso to bring elbow to opposite knee.", "Extend the alternate leg straight out."],
    commonMistakes: ["Moving too fast with poor extension", "Yanking neck forward"],
    postureTips: ["The rotation must come from the rib cage, not just flapping your elbows."],
    angles: { knee: "Extended: 160°–175°", elbow: "Open", hip: "Flexed: 75°–90°", shoulder: "Rotating" },
    safetyTips: "Keep your lower back pressed into the mat throughout the rotations."
  },
  "leg-raises": {
    id: "leg-raises",
    name: "Leg Raises",
    category: "CORE",
    videoUrl: "https://www.youtube.com/embed/JB2oyawG9KI",
    correctForm: ["Lie flat, raise legs straight to 90 degrees.", "Lower back slow until feet hover 2 inches off floor.", "Keep lower back flat."],
    commonMistakes: ["Lower back arching off floor at bottom", "Dropping legs quickly without control"],
    postureTips: ["If your lower back arches up, stop your descent earlier in the range."],
    angles: { knee: "165°–175°", elbow: "Static", hip: "160° to 85° Range", shoulder: "Flat" },
    safetyTips: "Place hands under your glutes to help stabilize your pelvis if needed."
  },
  "mountain-climbers": {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    category: "CORE",
    videoUrl: "https://www.youtube.com/embed/kLh-ucY0n4k",
    correctForm: ["Push-up plank stance.", "Drive knees forward to chest alternately.", "Keep hips level and steady."],
    commonMistakes: ["Bouncing hips up in the air", "Shoulders drifting backward away from hands"],
    postureTips: ["Keep your shoulders stacked directly over your wrists throughout."],
    angles: { knee: "Tucked: 35°–50°", elbow: "170°–180°", hip: "Tucked: 45°–60°", shoulder: "85°–95°" },
    safetyTips: "Do not tap the floor with your front foot; keep the weight on your core."
  },

  // === CARDIO ===
  "jumping-jacks": {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    category: "CARDIO",
    videoUrl: "https://www.youtube.com/embed/nGaXj3kkmU8",
    correctForm: ["Jump feet wide while swinging arms fully overhead.", "Return feet together and arms to sides quickly.", "Land softly."],
    commonMistakes: ["Landing flat-footed with locked knees", "Partial arm arcs"],
    postureTips: ["Stay light and springy on the balls of your feet to protect your joints."],
    angles: { knee: "160°–175° (Soft Landing)", elbow: "165°–175°", hip: "Dynamic", shoulder: "0° to 170° Abduction" },
    safetyTips: "Keep your knees tracking in line with your feet when landing wide."
  },
  "burpees": {
    id: "burpees",
    name: "Burpees",
    category: "CARDIO",
    videoUrl: "https://www.youtube.com/embed/dZfeMr_S600",
    correctForm: ["Drop into squat, jump feet back to plank.", "Perform push-up dropping chest to floor.", "Jump feet back in and explode overhead."],
    commonMistakes: ["Sloppy plank phase with sagging hips", "Hard flat-footed landings"],
    postureTips: ["Keep your core locked tight when jumping back into the plank stance."],
    angles: { knee: "Plank: 175°–180°", elbow: "Pushup: 70°–80°", hip: "Plank: 175°–180°", shoulder: "Dynamic" },
    safetyTips: "Step your feet back instead of jumping to scale down intensity."
  },
  "high-knees": {
    id: "high-knees",
    name: "High Knees",
    category: "CARDIO",
    videoUrl: "https://www.youtube.com/embed/Z16bUfM9vCc",
    correctForm: ["Run in place, driving knees up high.", "Aim for thighs parallel to ground.", "Pump arms dynamically in sync."],
    commonMistakes: ["Leaning torso backward to cheat height", "Landing heavily on your heels"],
    postureTips: ["Keep your spine tall, upright, and vertical throughout."],
    angles: { knee: "Driven: 30°–45°", elbow: "80°–100°", hip: "Driven: 80°–90°", shoulder: "Dynamic" },
    safetyTips: "Focus on maintaining a fast, springy tempo while landing on the balls of your feet."
  }
};
