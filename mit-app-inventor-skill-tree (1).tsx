import React, { useState, useEffect } from 'react';
import { Download, Upload, RotateCcw } from 'lucide-react';

const MITAppInventorSkillTree = () => {
  const [completedSkills, setCompletedSkills] = useState(new Set());
  const [expandedSections, setExpandedSections] = useState(new Set(['start']));

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const result = await window.storage.get('mit-ai-progress');
        if (result?.value) {
          setCompletedSkills(new Set(JSON.parse(result.value)));
        }
      } catch (error) {
        console.log('No saved progress found');
      }
    };
    loadProgress();
  }, []);

  const saveProgress = async (skills) => {
    try {
      await window.storage.set('mit-ai-progress', JSON.stringify([...skills]));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const toggleSkill = (skillId) => {
    setCompletedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillId)) {
        newSet.delete(skillId);
      } else {
        newSet.add(skillId);
      }
      saveProgress(newSet);
      return newSet;
    });
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const resetProgress = async () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      setCompletedSkills(new Set());
      try {
        await window.storage.delete('mit-ai-progress');
      } catch (error) {
        console.error('Failed to delete progress:', error);
      }
    }
  };

  const exportProgress = () => {
    const data = JSON.stringify([...completedSkills], null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mit-app-inventor-progress.json';
    a.click();
  };

  const importProgress = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          const newSet = new Set(data);
          setCompletedSkills(newSet);
          saveProgress(newSet);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const skillData = {
    start: {
      title: "START HERE",
      color: "#60a5fa",
      skills: [
        "Set up MIT App Inventor account and connect device",
        "Build a multi-screen app with navigation",
        "Implement basic CRUD operations with TinyDB",
        "Create a functional app using lists and loops",
        "Use procedures to organize code logic",
        "Handle user input validation and error messages",
        "Integrate at least 3 different UI components",
        "Test app thoroughly on real device"
      ]
    },
    layout: {
      title: "LAYOUT",
      color: "#3b82f6",
      skills: [
        "HorizontalArrangement",
        "VerticalArrangement",
        "TableArrangement",
        "HorizontalScrollArrangement",
        "VerticalScrollArrangement",
        "AbsoluteArrangement",
        "Nest 3+ arrangements for complex layouts",
        "Use percentage widths for responsive design",
        "Master AlignHorizontal and AlignVertical",
        "Build a dashboard with multiple sections"
      ]
    },
    uiBasic: {
      title: "USER INTERFACE - BASICS",
      color: "#93c5fd",
      skills: [
        "Button",
        "Label",
        "Image",
        "TextBox",
        "PasswordTextBox",
        "CheckBox",
        "Switch",
        "Slider",
        "ListPicker",
        "Spinner",
        "DatePicker",
        "TimePicker",
        "CircularProgress",
        "LinearProgress",
        "WebViewer"
      ]
    },
    uiAdvanced: {
      title: "USER INTERFACE - ADVANCED",
      color: "#2563eb",
      skills: [
        "Build dynamic ListView with custom data",
        "Create toast notifications with Notifier",
        "Implement ShowMessageDialog for alerts",
        "Use ShowChooseDialog for user decisions",
        "Embed and control HTML in WebViewer",
        "Generate components dynamically at runtime",
        "Modify component properties programmatically",
        "Design consistent theme across screens",
        "Pass complex data between screens",
        "Create splash screen with timer",
        "Build navigation drawer menu",
        "Implement tabbed interface pattern",
        "Validate forms before submission",
        "Add search/filter to ListView",
        "Design card-based UI layout"
      ]
    },
    media: {
      title: "MEDIA",
      color: "#06b6d4",
      skills: [
        "Sound",
        "Player",
        "SoundRecorder",
        "TextToSpeech",
        "SpeechRecognizer",
        "Camera",
        "Camcorder",
        "ImagePicker",
        "FilePicker",
        "VideoPlayer",
        "Translator",
        "Control audio playback (play/pause/stop)",
        "Customize TTS voice and speed",
        "Build voice-controlled feature",
        "Create photo gallery viewer",
        "Record and save audio files",
        "Stream audio from URL"
      ]
    },
    drawing: {
      title: "DRAWING & ANIMATION",
      color: "#0891b2",
      skills: [
        "Canvas - draw shapes and lines",
        "ImageSprite - movable objects",
        "Ball - bouncing physics",
        "Detect touch and drag events",
        "Implement sprite collision detection",
        "Animate sprite movement smoothly",
        "Build drawing app with color picker",
        "Create game with multiple sprites"
      ]
    },
    maps: {
      title: "MAPS & LOCATION",
      color: "#22d3ee",
      skills: [
        "Map",
        "Marker",
        "Circle",
        "Rectangle",
        "Polygon",
        "LineString",
        "FeatureCollection",
        "Navigation",
        "Display user location on map",
        "Add multiple custom markers",
        "Draw routes and paths",
        "Calculate distance between points",
        "Build location-based features",
        "Create interactive map with info windows"
      ]
    },
    charts: {
      title: "CHARTS & VISUALIZATION",
      color: "#7dd3fc",
      skills: [
        "Chart - bar, line, pie",
        "ChartData2D",
        "Trendline",
        "Add multiple data series",
        "Customize chart colors and labels",
        "Create dynamic charts from sensor data",
        "Build data dashboard with multiple charts"
      ]
    },
    dataScience: {
      title: "DATA SCIENCE & ML",
      color: "#0284c7",
      skills: [
        "AnomalyDetection",
        "Regression",
        "Train simple ML model with data",
        "Make predictions from trained model",
        "Visualize ML results",
        "Handle training data preparation"
      ]
    },
    sensors: {
      title: "SENSORS",
      color: "#38bdf8",
      skills: [
        "AccelerometerSensor",
        "GyroscopeSensor",
        "OrientationSensor",
        "Pedometer",
        "LocationSensor",
        "Clock",
        "ProximitySensor",
        "Barometer",
        "Hygrometer",
        "LightSensor",
        "Thermometer",
        "MagneticFieldSensor",
        "NearField",
        "BarcodeScanner",
        "Detect shake gestures",
        "Track device rotation and tilt",
        "Count steps and distance",
        "Get GPS coordinates",
        "Create timers and intervals",
        "Log sensor data over time",
        "Build compass application",
        "Combine multiple sensors"
      ]
    },
    social: {
      title: "SOCIAL",
      color: "#0ea5e9",
      skills: [
        "ContactPicker",
        "PhoneNumberPicker",
        "EmailPicker",
        "PhoneCall",
        "Texting",
        "Sharing",
        "Send SMS programmatically",
        "Receive and parse SMS",
        "Share text and images",
        "Make phone calls from app",
        "Validate email and phone formats",
        "Build contact management system"
      ]
    },
    storage: {
      title: "STORAGE",
      color: "#67e8f9",
      skills: [
        "TinyDB",
        "CloudDB",
        "TinyWebDB",
        "File",
        "DataFile",
        "Spreadsheet",
        "Store and retrieve from TinyDB",
        "Save lists and complex data",
        "Read and write text files",
        "Parse and create CSV files",
        "Sync data with CloudDB",
        "Store JSON structures",
        "Implement data backup/restore",
        "Build settings/preferences system"
      ]
    },
    connectivity: {
      title: "CONNECTIVITY",
      color: "#5eead4",
      skills: [
        "Web",
        "ActivityStarter",
        "BluetoothClient",
        "BluetoothServer",
        "Serial",
        "Make GET requests to APIs",
        "POST data to web services",
        "Parse JSON responses",
        "Handle API errors properly",
        "Connect via Bluetooth",
        "Send/receive Bluetooth data",
        "Open external apps with intents",
        "Build Bluetooth chat app",
        "Control Arduino via Bluetooth"
      ]
    },
    logic: {
      title: "LOGIC & PROGRAMMING",
      color: "#bfdbfe",
      skills: [
        "Create and use global variables",
        "Use local variables in procedures",
        "Build and manipulate lists",
        "Loop through lists with for each",
        "Sort and search lists",
        "Use dictionaries for key-value pairs",
        "Write if/else conditionals",
        "Implement nested if/else if",
        "Use for loops with counters",
        "Implement while loops",
        "Create custom procedures",
        "Build functions that return values",
        "Use procedure parameters",
        "Perform math operations",
        "Generate random numbers",
        "Manipulate strings (join, split, substring)",
        "Convert between data types",
        "Use Boolean logic (and, or, not)"
      ]
    },
    projects: {
      title: "PROJECTS",
      color: "#1e40af",
      skills: [
        "Calculator with all operations",
        "Multi-unit converter",
        "Note app with save/load",
        "Todo list with persistence",
        "Timer and stopwatch combo",
        "Expense tracker with charts",
        "Quiz app with score tracking",
        "Flashcard study app",
        "Soundboard with recordings",
        "Paint app with tools",
        "Music player with playlist",
        "Chat app with messages",
        "Memory matching game",
        "Maze runner game",
        "Trivia quiz game",
        "Arduino controller",
        "Weather station dashboard",
        "Fitness step tracker",
        "GPS location tracker",
        "Barcode scanner app",
        "Language translator",
        "Currency converter with live rates"
      ]
    },
    advanced: {
      title: "ADVANCED",
      color: "#1d4ed8",
      skills: [
        "Import and use extensions (.aix)",
        "Build modular reusable code",
        "Implement state management",
        "Handle async operations",
        "Create event-driven architecture",
        "Optimize app performance",
        "Reduce memory usage",
        "Implement data caching",
        "Build offline-first apps",
        "Create background services",
        "Add local notifications",
        "Implement deep linking",
        "Support multiple languages"
      ]
    },
    deployment: {
      title: "DEPLOYMENT",
      color: "#a5f3fc",
      skills: [
        "Generate APK file",
        "Create custom app icon",
        "Configure app permissions",
        "Set version number properly",
        "Build AAB for Play Store",
        "Write store description",
        "Create screenshots",
        "Test on multiple devices",
        "Implement version updates",
        "Handle user feedback"
      ]
    }
  };

  const totalSkills = Object.values(skillData).reduce((sum, section) => sum + section.skills.length, 0);
  const completedCount = completedSkills.size;
  const percentage = Math.round((completedCount / totalSkills) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-2 border-gray-800 rounded-lg p-6 mb-6">
          <h1 className="text-4xl font-bold mb-2">MIT App Inventor Skill Tree</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-bold">Progress: {completedCount}/{totalSkills}</span>
                <span className="font-bold">{percentage}%</span>
              </div>
              <div className="h-8 bg-gray-200 border-2 border-gray-800 rounded-lg">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300 rounded-md"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={resetProgress}
              className="px-4 py-2 bg-blue-500 text-white font-bold border-2 border-gray-800 rounded-lg hover:bg-blue-600"
            >
              <RotateCcw size={16} className="inline mr-2" />
              Reset Progress
            </button>
          </div>
        </div>

        {/* Skill Sections */}
        <div className="space-y-4">
          {Object.entries(skillData).map(([sectionId, section]) => {
            const sectionCompleted = section.skills.filter(skill => 
              completedSkills.has(`${sectionId}-${skill}`)
            ).length;
            const isExpanded = expandedSections.has(sectionId);

            return (
              <div key={sectionId} className="border-2 border-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(sectionId)}
                  className="w-full p-4 flex items-center justify-between font-bold text-lg hover:opacity-90 text-black"
                  style={{ backgroundColor: section.color }}
                >
                  <span>{section.title}</span>
                  <div className="flex items-center gap-3">
                    <span>{sectionCompleted}/{section.skills.length}</span>
                    <span>{isExpanded ? '▼' : '▶'}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {section.skills.map((skill, index) => {
                        const skillId = `${sectionId}-${skill}`;
                        const isCompleted = completedSkills.has(skillId);

                        return (
                          <label
                            key={index}
                            className="flex items-start gap-3 p-3 border-2 border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50"
                            style={{ backgroundColor: isCompleted ? section.color : 'white' }}
                          >
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={() => toggleSkill(skillId)}
                              className="mt-1 w-5 h-5 cursor-pointer"
                            />
                            <span className={`text-sm ${isCompleted ? 'font-semibold' : ''}`}>
                              {skill}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm bg-white border-2 border-gray-800 rounded-lg p-4">
          <p className="font-bold mb-2">Total Skills: {totalSkills}</p>
          <p className="mb-3">Click checkboxes to track your progress. Data saves automatically.</p>
          <p className="text-xs text-gray-600 mt-4 pt-3 border-t border-gray-300">Created by Devendhar B</p>
        </div>
      </div>
    </div>
  );
};

export default MITAppInventorSkillTree;