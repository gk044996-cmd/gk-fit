import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import * as fitFormService from '../services/fitFormService.js';
import { exerciseVideoDatabase } from './exerciseDatabase.js';
import ExerciseVideoPlayer from './ExerciseVideoPlayer.jsx';
import Card from '../components/Common/Card.jsx';
import Button from '../components/Common/Button.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';
import { 
  FiCamera, 
  FiVideo, 
  FiVolume2, 
  FiVolumeX, 
  FiPlay, 
  FiSquare, 
  FiUploadCloud, 
  FiAward, 
  FiCpu, 
  FiClock, 
  FiTarget, 
  FiZap,
  FiX 
} from 'react-icons/fi';

const FitTheForm = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  // Category and active exercise states matching user specs
  const [selectedCategory, setSelectedCategory] = useState('LEGS');
  const [selectedExerciseId, setSelectedExerciseId] = useState('squat');
  const [exercise, setExercise] = useState(exerciseVideoDatabase['squat']);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // Script loading and MediaPipe initialization
  const [modelLoading, setModelLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [mode, setMode] = useState('none'); // 'camera', 'demo', 'upload', 'none'
  const [sessionActive, setSessionActive] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Performance tracking metrics
  const [repCount, setRepCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [savingSession, setSavingSession] = useState(false);

  // DOM elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);

  // MediaPipe References
  const poseDetectorRef = useRef(null);
  const cameraRef = useRef(null);
  const activeExerciseRef = useRef(exercise);
  const repStateRef = useRef('UP'); // 'UP', 'DOWN' for push/press; 'DOWN', 'UP' for curls
  const lastRepTickRef = useRef(0);

  // Simulation variables
  const demoCycleRef = useRef(0);
  const logsEndRef = useRef(null);

  // Distinct Categories list
  const categories = Array.from(new Set(Object.values(exerciseVideoDatabase).map(e => e.category)));

  // Sync active exercise ref
  useEffect(() => {
    activeExerciseRef.current = exercise;
  }, [exercise]);

  // Load history logs from database
  const fetchLogs = async () => {
    setHistoryLoading(true);
    try {
      const logs = await fitFormService.getFitFormHistory();
      setWorkoutHistory(logs);
    } catch (err) {
      console.error(err);
      showToast('Could not load posture session history', 'error');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    return () => {
      stopAllStreams();
    };
  }, []);

  // Update active exercise on selector change
  useEffect(() => {
    if (exerciseVideoDatabase[selectedExerciseId]) {
      setIsVideoLoading(true);
      setExercise(exerciseVideoDatabase[selectedExerciseId]);
      // Reset tracking state machine
      repStateRef.current = 'UP';
      setRepCount(0);
      setAccuracy(100);
      setConsoleLogs([]);
    }
  }, [selectedExerciseId]);

  // Scroll AI Console logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  // Load MediaPipe scripts dynamically
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  };

  const loadMediaPipe = async () => {
    if (window.Pose && window.Camera) {
      setModelLoaded(true);
      return true;
    }
    
    setModelLoading(true);
    addLog('Hydrating AI scanning models from CDN...', 'info');

    try {
      // Load MediaPipe Pose Core and Camera Utils scripts
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
      
      setModelLoaded(true);
      addLog('Webcam pose estimation models initialized successfully.', 'success');
      speakFeedback('Models ready.');
      return true;
    } catch (err) {
      console.error('Failed to load MediaPipe scripts:', err);
      addLog('Webcam script timeout. Running in simulated laser scan mode.', 'warning');
      return false;
    } finally {
      setModelLoading(false);
    }
  };

  // Audio Speech Synthesizer
  const speakFeedback = (text) => {
    if (!audioEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [...prev, { timestamp, message, type }]);
  };

  // Stop camera streams & analysis cycles
  const stopAllStreams = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.src = "";
    }

    if (poseDetectorRef.current) {
      poseDetectorRef.current.close();
      poseDetectorRef.current = null;
    }
  };

  // Start Camera with MediaPipe Pose tracking
  const startCamera = async () => {
    stopAllStreams();
    setMode('camera');
    setSessionActive(false);
    setRepCount(0);
    setTimer(0);
    setAccuracy(100);
    setConsoleLogs([]);

    const hasLoaded = await loadMediaPipe();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          
          if (hasLoaded && window.Pose) {
            initializeRealPoseDetector();
          } else {
            // Fall back to high fidelity simulated skeletal projector
            startHUDCanvasLoop();
          }
        };
      }
      addLog('Camera lens active. Scanning frame...', 'success');
      speakFeedback('Webcam online.');
    } catch (err) {
      console.error(err);
      setMode('none');
      showToast('Could not access camera. Ensure permissions are granted.', 'error');
    }
  };

  // Initialize MediaPipe Pose instance
  const initializeRealPoseDetector = () => {
    const pose = new window.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResultsHandler);
    poseDetectorRef.current = pose;

    if (videoRef.current && window.Camera) {
      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (poseDetectorRef.current) {
            await poseDetectorRef.current.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });
      camera.start();
      cameraRef.current = camera;
    }
  };

  // Start Demo Mode
  const startDemo = () => {
    stopAllStreams();
    setMode('demo');
    setSessionActive(true);
    setRepCount(0);
    setTimer(0);
    setAccuracy(100);
    setConsoleLogs([]);
    demoCycleRef.current = 0;

    addLog('Initializing simulated AI trainer environment...', 'info');
    speakFeedback(`Starting simulated ${exercise.name} tracking.`);

    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    startHUDCanvasLoop();
  };

  // Handle Video Upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    stopAllStreams();
    setMode('upload');
    setSessionActive(true);
    setRepCount(0);
    setTimer(0);
    setAccuracy(100);
    setConsoleLogs([]);

    addLog(`Scanning clip: ${file.name}`, 'info');
    speakFeedback(`Processing uploaded video file.`);

    const url = URL.createObjectURL(file);
    const hasLoaded = await loadMediaPipe();

    if (videoRef.current) {
      videoRef.current.src = url;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        if (hasLoaded && window.Pose) {
          initializeRealPoseDetector();
        } else {
          startHUDCanvasLoop();
        }
      };
    }

    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  // Start active recording
  const startRecording = () => {
    if (sessionActive) return;
    setSessionActive(true);
    setRepCount(0);
    setTimer(0);
    setAccuracy(100);
    setConsoleLogs([]);
    addLog(`AI motion capture active for ${exercise.name}.`, 'success');
    speakFeedback(`Analysis started. Begin your ${exercise.name}s.`);

    timerIntervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  // Pause session
  const stopRecording = () => {
    if (!sessionActive) return;
    setSessionActive(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    addLog('Capture session paused.', 'info');
    speakFeedback('Session paused.');
  };

  // Save Workout to database
  const handleSaveWorkout = async () => {
    if (repCount === 0 && timer < 5) {
      showToast('Capture a longer workout with at least 1 rep', 'warning');
      return;
    }

    setSavingSession(true);
    const todayStr = new Date().toISOString().split('T')[0];
    
    let status = 'Correct';
    if (accuracy < 75) status = 'Incorrect';
    else if (accuracy < 90) status = 'Needs Improvement';

    const calories = Math.round(
      exercise.id === 'plank' || exercise.id === 'side-plank'
        ? 0.1 * timer 
        : (exercise.category === 'LEGS' ? 0.32 : 0.22) * repCount
    );

    const feedbackArray = Array.from(new Set(
      consoleLogs
        .filter(l => l.type === 'error' || l.type === 'warning')
        .map(l => l.message)
    )).slice(0, 3);

    if (feedbackArray.length === 0) {
      feedbackArray.push('Strict biomechanical movement. Excellent!');
    }

    try {
      await fitFormService.logFitFormSession({
        exercise: exercise.name,
        reps: repCount,
        duration: timer,
        accuracy: Math.round(accuracy),
        caloriesBurned: calories,
        status,
        feedback: feedbackArray,
        date: todayStr
      });
      showToast('Exercise form accuracy saved successfully!', 'success');
      fetchLogs();
      stopAllStreams();
      setMode('none');
      setSessionActive(false);
    } catch (err) {
      console.error(err);
      showToast('Could not save session details', 'error');
    } finally {
      setSavingSession(false);
    }
  };

  // Vector Trigonometry for Joint Angle Calculation
  const calculateAngle = (p1, p2, p3) => {
    if (!p1 || !p2 || !p3) return 180;
    const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
      angle = 360.0 - angle;
    }
    return angle;
  };

  // MediaPipe results handler
  const onResultsHandler = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 640;
    const height = canvas.height = 480;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw webcam feed
    if (results.image) {
      ctx.drawImage(results.image, 0, 0, width, height);
    }

    // 2. Draw HUD grid lines
    drawHUDTechElements(ctx, width, height);

    if (results.poseLandmarks) {
      const landmarks = results.poseLandmarks;

      // Extract critical joints scaled to canvas dimensions
      const getJoint = (idx) => {
        const lm = landmarks[idx];
        if (!lm || lm.visibility < 0.45) return null;
        return { x: lm.x * width, y: lm.y * height, visibility: lm.visibility };
      };

      const baseJoints = {
        nose: getJoint(0),
        lShoulder: getJoint(11),
        rShoulder: getJoint(12),
        lElbow: getJoint(13),
        rElbow: getJoint(14),
        lWrist: getJoint(15),
        rWrist: getJoint(16),
        lHip: getJoint(23),
        rHip: getJoint(24),
        lKnee: getJoint(25),
        rKnee: getJoint(26),
        lAnkle: getJoint(27),
        rAnkle: getJoint(28)
      };

      // Perform real-time biomechanical analysis if session is recording
      let postureStatus = 'good';
      let alertMessage = '';
      let calculatedAngle = 180;

      if (sessionActive) {
        const exId = activeExerciseRef.current.id;

        if (exId.includes('squat')) {
          // Knee extension check
          const knee = baseJoints.lKnee || baseJoints.rKnee;
          const hip = baseJoints.lHip || baseJoints.rHip;
          const ankle = baseJoints.lAnkle || baseJoints.rAnkle;
          calculatedAngle = Math.round(calculateAngle(hip, knee, ankle));

          // Incomplete depth and knee valgus checks
          if (calculatedAngle < 120) {
            const hipY = hip ? hip.y : 0;
            const kneeY = knee ? knee.y : 0;
            
            // Checking if hip crease is above knee
            if (calculatedAngle > 95 && hipY < kneeY) {
              postureStatus = 'error';
              alertMessage = 'Lower your squat depth!';
            }

            // Knee valgus check
            if (baseJoints.lKnee && baseJoints.rKnee && baseJoints.lAnkle && baseJoints.rAnkle) {
              const kneeDist = Math.abs(baseJoints.lKnee.x - baseJoints.rKnee.x);
              const ankleDist = Math.abs(baseJoints.lAnkle.x - baseJoints.rAnkle.x);
              if (kneeDist < ankleDist * 0.8) {
                postureStatus = 'error';
                alertMessage = 'Push your knees out!';
              }
            }
          }

          // Rep counter transition
          trackRepTransitions(calculatedAngle, 90, 165, 'DOWN');
        } 
        else if (exId.includes('push-up') || exId.includes('bench-press') || exId.includes('skull-crushers') || exId.includes('dips')) {
          const elbow = baseJoints.lElbow || baseJoints.rElbow;
          const shoulder = baseJoints.lShoulder || baseJoints.rShoulder;
          const wrist = baseJoints.lWrist || baseJoints.rWrist;
          const hip = baseJoints.lHip || baseJoints.rHip;
          const knee = baseJoints.lKnee || baseJoints.rKnee;
          calculatedAngle = Math.round(calculateAngle(shoulder, elbow, wrist));

          // Push-up Sagging Hips Check
          if (exId === 'push-up' || exId === 'incline-push-up') {
            const hipAngle = Math.round(calculateAngle(shoulder, hip, knee));
            if (hipAngle < 165) {
              postureStatus = 'error';
              alertMessage = 'Lift your hips, brace core!';
            }
          }

          trackRepTransitions(calculatedAngle, 90, 165, 'DOWN');
        }
        else if (exId.includes('curl')) {
          // Bicep curl: elbow flex
          const elbow = baseJoints.lElbow || baseJoints.rElbow;
          const shoulder = baseJoints.lShoulder || baseJoints.rShoulder;
          const wrist = baseJoints.lWrist || baseJoints.rWrist;
          calculatedAngle = Math.round(calculateAngle(shoulder, elbow, wrist));

          // Shoulder cheat check: upper arm should remain static
          const hip = baseJoints.lHip || baseJoints.rHip;
          const shoulderFlex = Math.round(calculateAngle(hip, shoulder, elbow));
          if (shoulderFlex > 20) {
            postureStatus = 'warning';
            alertMessage = 'Keep elbows at your side!';
          }

          trackRepTransitions(calculatedAngle, 45, 160, 'UP');
        }
        else if (exId.includes('press') || exId === 'lat-pulldown' || exId === 'pull-up') {
          const elbow = baseJoints.lElbow || baseJoints.rElbow;
          const shoulder = baseJoints.lShoulder || baseJoints.rShoulder;
          const wrist = baseJoints.lWrist || baseJoints.rWrist;
          calculatedAngle = Math.round(calculateAngle(shoulder, elbow, wrist));

          if (exId.includes('press')) {
            trackRepTransitions(calculatedAngle, 165, 80, 'UP');
          } else {
            // Pulldowns / Pull-ups
            trackRepTransitions(calculatedAngle, 45, 160, 'UP');
          }
        }
        else if (exId === 'plank') {
          const shoulder = baseJoints.lShoulder || baseJoints.rShoulder;
          const hip = baseJoints.lHip || baseJoints.rHip;
          const knee = baseJoints.lKnee || baseJoints.rKnee;
          calculatedAngle = Math.round(calculateAngle(shoulder, hip, knee));

          if (calculatedAngle < 165) {
            postureStatus = 'error';
            alertMessage = 'Flatten your back!';
          }
        }

        // Voice Cues
        if (alertMessage && Date.now() - lastRepTickRef.current > 4000) {
          lastRepTickRef.current = Date.now();
          addLog(`Warning: ${alertMessage}`, 'warning');
          speakFeedback(alertMessage);
          setAccuracy(prev => Math.max(50, prev - 8));
        }
      }

      // Draw Joint Connectors
      renderSkeletonConnections(ctx, baseJoints, postureStatus);
      
      // Draw Angle indicator
      renderAngleHUD(ctx, baseJoints, calculatedAngle, postureStatus, alertMessage);
    }
  };

  // Rep count logic state-machine
  const trackRepTransitions = (angle, targetVal, releaseVal, flexDirection = 'DOWN') => {
    if (flexDirection === 'DOWN') {
      // Squat / Pushup / Bench Press
      if (repStateRef.current === 'UP' && angle <= targetVal) {
        repStateRef.current = 'DOWN';
      } 
      else if (repStateRef.current === 'DOWN' && angle >= releaseVal) {
        repStateRef.current = 'UP';
        setRepCount(prev => prev + 1);
        speakFeedback(`Rep ${repCount + 1}`);
        addLog(`Rep ${repCount + 1}: Correct depth lockout.`, 'success');
        setAccuracy(prev => Math.min(100, prev + 2));
      }
    } else {
      // Curl / Press / Pullups
      if (repStateRef.current === 'UP' && angle >= targetVal) {
        repStateRef.current = 'DOWN';
      }
      else if (repStateRef.current === 'DOWN' && angle <= releaseVal) {
        repStateRef.current = 'UP';
        setRepCount(prev => prev + 1);
        speakFeedback(`Rep ${repCount + 1}`);
        addLog(`Rep ${repCount + 1}: High tension lockout.`, 'success');
        setAccuracy(prev => Math.min(100, prev + 2));
      }
    }
  };

  // Draws laser scan HUD details
  const drawHUDTechElements = (ctx, width, height) => {
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    if (sessionActive) {
      const scanY = (Date.now() / 8) % height;
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(12, scanY);
      ctx.lineTo(width - 12, scanY);
      ctx.stroke();
    }

    const cL = 20;
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(10, 10 + cL); ctx.lineTo(10, 10); ctx.lineTo(10 + cL, 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(width - 10 - cL, 10); ctx.lineTo(width - 10, 10); ctx.lineTo(width - 10, 10 + cL); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, height - 10 - cL); ctx.lineTo(10, height - 10); ctx.lineTo(10 + cL, height - 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(width - 10 - cL, height - 10); ctx.lineTo(width - 10, height - 10); ctx.lineTo(width - 10, height - 10 - cL); ctx.stroke();

    ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('FIT THE FORM COMPUTER VISION ACTIVE', 25, 30);
    ctx.fillText(sessionActive ? 'MOTION CAPTURE ENABLED' : 'CALIBRATING SCANNER...', 25, 45);
  };

  // Draw skeleton projections
  const renderSkeletonConnections = (ctx, joints, postureStatus) => {
    let strokeColor = 'rgba(16, 185, 129, 0.75)'; // green
    let pulseColor = 'rgba(16, 185, 129, 0.3)';

    if (postureStatus === 'error') {
      strokeColor = 'rgba(239, 68, 68, 0.8)'; // red
      pulseColor = 'rgba(239, 68, 68, 0.3)';
    } else if (postureStatus === 'warning') {
      strokeColor = 'rgba(249, 115, 22, 0.8)'; // orange
      pulseColor = 'rgba(249, 115, 22, 0.3)';
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawBone = (j1, j2) => {
      if (j1 && j2) {
        ctx.beginPath();
        ctx.moveTo(j1.x, j1.y);
        ctx.lineTo(j2.x, j2.y);
        ctx.stroke();
      }
    };

    // Draw lines
    drawBone(joints.lShoulder, joints.rShoulder);
    drawBone(joints.lShoulder, joints.lElbow);
    drawBone(joints.lElbow, joints.lWrist);
    drawBone(joints.rShoulder, joints.rElbow);
    drawBone(joints.rElbow, joints.rWrist);

    drawBone(joints.lShoulder, joints.lHip);
    drawBone(joints.rShoulder, joints.rHip);
    drawBone(joints.lHip, joints.rHip);

    drawBone(joints.lHip, joints.lKnee);
    drawBone(joints.lKnee, joints.lAnkle);
    drawBone(joints.rHip, joints.rKnee);
    drawBone(joints.rKnee, joints.rAnkle);

    // Nodes
    ctx.fillStyle = postureStatus === 'error' ? '#ef4444' : (postureStatus === 'warning' ? '#f97316' : '#10b981');
    Object.keys(joints).forEach(key => {
      const pt = joints[key];
      if (pt) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, key === 'nose' ? 10 : 6, 0, 2 * Math.PI);
        ctx.fill();

        if (sessionActive) {
          ctx.strokeStyle = pulseColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 6 + (Math.sin(Date.now() / 150) * 4 + 4), 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
    });
  };

  const renderAngleHUD = (ctx, joints, angle, postureStatus, alertMessage) => {
    let focusJoint = joints.lKnee || joints.rKnee;
    const exId = activeExerciseRef.current.id;

    if (exId.includes('curl') || exId.includes('push-up') || exId.includes('press') || exId.includes('pulldown')) {
      focusJoint = joints.lElbow || joints.rElbow;
    } else if (exId === 'plank') {
      focusJoint = joints.lHip || joints.rHip;
    }

    if (focusJoint) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`${exercise.name} Angle: ${angle}°`, focusJoint.x + 15, focusJoint.y - 5);
    }

    if (alertMessage) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(`🚨 CUE: ${alertMessage.toUpperCase()}`, 180, 440);
    }
  };

  // High fidelity simulated loop for Demo/Simulation fallback
  const startHUDCanvasLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    const render = () => {
      if (mode === 'none') return;

      const width = canvas.width = 640;
      const height = canvas.height = 480;

      ctx.clearRect(0, 0, width, height);

      // Render uploaded clip or black HUD background
      if (mode === 'upload' && video && video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height);
      } else {
        ctx.fillStyle = '#07070d';
        ctx.fillRect(0, 0, width, height);

        // draw background cybergrid
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.04)';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
        }
        for (let j = 0; j < height; j += 40) {
          ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke();
        }
      }

      drawHUDTechElements(ctx, width, height);

      // Simulated joint tracking math
      let phase = 0;
      if (sessionActive) {
        demoCycleRef.current += 0.035;
        phase = (Math.sin(demoCycleRef.current) + 1) / 2;
      }

      const isFaulty = (repCount + 1) % 3 === 0;
      
      const baseJoints = {
        nose: { x: width / 2, y: height * 0.22 },
        lShoulder: { x: width / 2 - 60, y: height * 0.32 },
        rShoulder: { x: width / 2 + 60, y: height * 0.32 },
        lElbow: { x: width / 2 - 95, y: height * 0.44 },
        rElbow: { x: width / 2 + 95, y: height * 0.44 },
        lWrist: { x: width / 2 - 100, y: height * 0.56 },
        rWrist: { x: width / 2 + 100, y: height * 0.56 },
        lHip: { x: width / 2 - 40, y: height * 0.56 },
        rHip: { x: width / 2 + 40, y: height * 0.56 },
        lKnee: { x: width / 2 - 50, y: height * 0.72 },
        rKnee: { x: width / 2 + 50, y: height * 0.72 },
        lAnkle: { x: width / 2 - 50, y: height * 0.88 },
        rAnkle: { x: width / 2 + 50, y: height * 0.88 }
      };

      let calculatedAngle = 180;
      let postureStatus = 'good';
      let alertMessage = '';

      const exId = exercise.id;

      if (exId.includes('squat')) {
        const descent = phase * 75;
        baseJoints.lHip.y += descent;
        baseJoints.rHip.y += descent;
        baseJoints.lKnee.x -= phase * 12;
        baseJoints.rKnee.x += phase * 12;
        calculatedAngle = Math.round(180 - (phase * 95));

        if (sessionActive && phase > 0.85) {
          if (isFaulty) {
            postureStatus = 'error';
            alertMessage = 'Lower your squat depth!';
            baseJoints.lHip.y -= 25;
            baseJoints.rHip.y -= 25;
            calculatedAngle = 115;
          }
        }
      } 
      else if (exId.includes('push-up') || exId.includes('press') || exId.includes('curl') || exId.includes('pulldown') || exId.includes('row')) {
        const flex = phase * 60;
        baseJoints.lWrist.y -= flex * 1.2;
        baseJoints.rWrist.y -= flex * 1.2;
        calculatedAngle = Math.round(175 - (phase * 120));

        if (sessionActive && phase > 0.85) {
          if (isFaulty) {
            postureStatus = 'error';
            alertMessage = 'Keep back straight, elbows tucked!';
            calculatedAngle = 125;
          }
        }
      }

      // Demo repetitions trigger
      if (mode === 'demo' && sessionActive) {
        const val = demoCycleRef.current % (2 * Math.PI);
        if (val > 1.45 && val < 1.55) {
          const cycleNum = Math.floor(demoCycleRef.current / (2 * Math.PI));
          if (window['last_sim_cycle'] !== cycleNum) {
            window['last_sim_cycle'] = cycleNum;

            if (isFaulty) {
              addLog(`Warning: ${alertMessage}`, 'error');
              speakFeedback(alertMessage);
              setAccuracy(prev => Math.max(50, prev - 10));
            } else {
              setRepCount(prev => prev + 1);
              speakFeedback(`Rep ${repCount + 1}`);
              addLog(`Rep ${repCount + 1}: Excellent execution depth.`, 'success');
              setAccuracy(prev => Math.min(100, prev + 2));
            }
          }
        }
      }

      renderSkeletonConnections(ctx, baseJoints, postureStatus);
      renderAngleHUD(ctx, baseJoints, calculatedAngle, postureStatus, alertMessage);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  return (
    <div className="min-h-screen bg-[#09090e] text-slate-100 p-6 font-sans selection:bg-orange-500 selection:text-white relative">
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/5 pb-6 relative z-10">
        <div className="text-left w-full md:w-auto">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase flex items-center gap-2">
            FIT THE FORM <span className="text-orange-505 text-sm font-mono px-2 py-0.5 bg-orange-500/10 rounded border border-orange-500/20 ml-2">v2.0 AI</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Real-time Computer Vision Posture Analysis & Professional Biomechanics Integration</p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-white/5 p-1.5 rounded-xl border border-white/5 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const firstEx = Object.values(exerciseVideoDatabase).find(e => e.category === cat);
                if (firstEx) setSelectedExerciseId(firstEx.id);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                selectedCategory === cat 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-650 text-white shadow-lg shadow-purple-650/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Studio Interface Split */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* LEFT SIDE: LIVE POSTURE CAPTURE (5 Columns) */}
        <section className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-xl overflow-hidden group">
            
            {/* Real Video / Webcam feed */}
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute w-full h-full object-cover opacity-0 pointer-events-none"
            />

            {/* Glowing Scan Overlay Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute w-full h-full object-cover z-10"
              width="640"
              height="480"
            />

            {/* Camera Simulated Viewport Initial State */}
            {mode === 'none' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
                {modelLoading ? (
                  <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-600 rounded-full animate-spin mb-4" />
                ) : (
                  <div className="w-16 h-16 border-2 border-dashed border-purple-500/40 rounded-full flex items-center justify-center text-purple-400 text-2xl mb-4">
                    <FiCamera className="animate-pulse" />
                  </div>
                )}
                <p className="text-sm font-medium text-slate-300">
                  {modelLoading ? 'Calibrating neural projection lattices...' : 'Awaiting local camera authorization input stream...'}
                </p>
                <p className="text-xs text-slate-500 mt-1">Computer vision pose landmarks will auto-overlay at runtime.</p>
                
                <div className="flex flex-wrap gap-2.5 justify-center mt-6">
                  <button
                    onClick={startCamera}
                    className="px-4 py-2.5 bg-purple-650 hover:bg-purple-750 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-950/20 flex items-center gap-1.5"
                  >
                    <FiCamera /> Start Camera
                  </button>
                  <button
                    onClick={startDemo}
                    className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <FiPlay /> Run Simulated Demo
                  </button>
                  <label className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                    <FiUploadCloud /> Upload Video
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleVideoUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Neon Accent Tracking Borders */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-orange-500 rounded-tl-md z-20 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-orange-500 rounded-tr-md z-20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-orange-500 rounded-bl-md z-20 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-orange-500 rounded-br-md z-20 pointer-events-none" />

            {/* Simulated Live UI Metrics HUD Overlay */}
            {mode !== 'none' && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 flex justify-between items-end z-20 pointer-events-none">
                <div className="text-left">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ENGINE ACTIVE
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-white leading-tight">{exercise.name} Tracking</h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
                    <span>Acc: {Math.round(accuracy)}%</span>
                    <span>•</span>
                    <span>T: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">REP COUNT</p>
                  <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500 font-mono leading-none">
                    {repCount.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controller Bar */}
          {mode !== 'none' && (
            <Card className="flex flex-wrap justify-between items-center gap-4 p-4 border border-white/5 z-20 relative">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => {
                    setAudioEnabled(!audioEnabled);
                    showToast(audioEnabled ? 'Audio coach muted' : 'Audio coach unmuted', 'info');
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                  title="Toggle Voice Feed"
                >
                  {audioEnabled ? <FiVolume2 className="text-purple-400 animate-pulse" /> : <FiVolumeX />}
                </button>

                <div className="h-4 border-l border-white/10" />

                <div className="flex items-center gap-1.5 text-slate-300">
                  <FiClock className="text-purple-400" />
                  <span>Timer: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {mode === 'camera' && (
                  <button
                    onClick={sessionActive ? stopRecording : startRecording}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      sessionActive 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'bg-purple-650 hover:bg-purple-750 text-white'
                    }`}
                  >
                    {sessionActive ? <FiSquare /> : <FiPlay />}
                    {sessionActive ? 'Pause' : 'Start'}
                  </button>
                )}

                <button
                  onClick={handleSaveWorkout}
                  disabled={savingSession}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white flex items-center gap-1.5 transition-all shadow-md"
                >
                  {savingSession ? <LoadingSpinner size="sm" /> : <FiAward />}
                  Log Session
                </button>

                <button
                  onClick={() => {
                    stopAllStreams();
                    setMode('none');
                    setSessionActive(false);
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
                  title="Close Media Stream"
                >
                  <FiX />
                </button>
              </div>
            </Card>
          )}

          {/* Quick-Change Action Stacks */}
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl text-left relative z-20">
            <label className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-2">Change Routine Model:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(exerciseVideoDatabase)
                .filter((ex) => ex.category === selectedCategory)
                .map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExerciseId(ex.id)}
                    className={`px-3 py-2 text-xs font-bold rounded-lg transition-all duration-200 border text-center ${
                      selectedExerciseId === ex.id
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-500 text-white shadow-lg shadow-purple-600/10"
                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {ex.name}
                  </button>
                ))}
            </div>
          </div>

          {/* AI Console Feed */}
          {mode !== 'none' && (
            <Card className="flex flex-col gap-3 p-5 border border-white/5 text-left relative z-20">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Real-time Feedback Stream
                </span>
                <button
                  onClick={() => setConsoleLogs([])}
                  className="text-[9px] font-bold text-slate-500 hover:text-white"
                >
                  Clear
                </button>
              </div>

              <div className="h-28 overflow-y-auto bg-black/40 rounded-xl border border-white/5 p-3 text-xs font-mono space-y-1.5">
                {consoleLogs.length === 0 ? (
                  <span className="text-slate-600 italic">No telemetry reports compiled yet. Stand in frame...</span>
                ) : (
                  consoleLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-slate-500 select-none">[{log.timestamp}]</span>
                      <span className={
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'warning' ? 'text-orange-400' :
                        log.type === 'error' ? 'text-red-400 font-bold' : 'text-purple-400'
                      }>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </Card>
          )}
        </section>

        {/* RIGHT SIDE: DYNAMIC YOUTUBE TUTORIAL & PERFORMANCE SPECIFICATION GUIDE (7 Columns) */}
        <section className="lg:col-span-7 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-6 w-full"
            >
              {/* Premium Embedded Video Platform Container */}
              <ExerciseVideoPlayer 
                videoUrl={exercise.videoUrl} 
                exerciseName={exercise.name} 
              />

              {/* Comprehensive Form Specification Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Panel 1: Execution Protocol */}
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl shadow-xl backdrop-blur-md text-left">
                  <h4 className="text-sm font-bold tracking-wider text-purple-400 uppercase flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> SYSTEM POSTURE LAWS
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {exercise.correctForm.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-mono mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Panel 2: Error Identifiers */}
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl shadow-xl backdrop-blur-md text-left">
                  <h4 className="text-sm font-bold tracking-wider text-orange-400 uppercase flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> FAULT TRIGGER PATTERNS
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {exercise.commonMistakes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-400 font-mono mt-0.5">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Joint Biomechanics Telemetry Matrix Card */}
              <div className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 p-5 rounded-2xl text-left">
                <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Biomechanical Joint Range Constraints</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(exercise.angles).map(([joint, range]) => (
                    <div key={joint} className="bg-[#12121a]/60 border border-white/5 p-3 rounded-xl text-center">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-1">{joint}</p>
                      <p className="text-sm font-bold text-white bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text truncate">{range}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Proactive Cues & Safety Callouts */}
              <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex items-start gap-3 text-left">
                <div className="text-amber-500 font-bold text-lg leading-none mt-0.5">⚠️</div>
                <div>
                  <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wide">Trainer Safety Directive</h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{exercise.safetyTips}</p>
                </div>
              </div>

              {/* Workout History Sessions list */}
              <Card className="flex flex-col gap-3 p-5 border border-white/5 text-left w-full">
                <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest border-b border-white/5 pb-2">
                  Session Accuracies Log
                </h3>

                {historyLoading ? (
                  <div className="py-6 flex justify-center">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : workoutHistory.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500 italic">
                    No posture analysis logs saved yet. Start scanning to save.
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                    {workoutHistory
                      .filter(item => item.exercise === exercise.name)
                      .map((item) => (
                        <div 
                          key={item._id} 
                          className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center group hover:border-purple-500/20 transition-all text-xs"
                        >
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{item.exercise}</span>
                              <span className="text-[10px] text-slate-500">{item.date}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-3">
                              <span className="text-orange-400 font-bold">Reps: {item.reps}</span>
                              <span>•</span>
                              <span>Duration: {item.duration}s</span>
                              <span>•</span>
                              <span className="text-purple-400 font-semibold">Acc: {item.accuracy}%</span>
                            </div>
                          </div>

                          <div className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            item.status === 'Correct' 
                              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
                              : item.status === 'Needs Improvement'
                              ? 'bg-orange-500/10 border-orange-500/25 text-orange-400'
                              : 'bg-red-500/10 border-red-500/25 text-red-400'
                          }`}>
                            {item.status}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Card>

            </motion.div>
          </AnimatePresence>
        </section>

      </main>
    </div>
  );
};

export default FitTheForm;
