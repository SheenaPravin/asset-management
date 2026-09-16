// Demo dataset for the GitHub Pages build (no backend on Pages).
// Same 5 lab assets as the server seed script.
export const DEMO_RECORDS = [
  { _id: "demo-1", item_name: "Universal Robot UR5e", item_id_numbers: "RASL-ROB-001", item_storage_loc: "Lab A / Bay 1", item_checked_out: false, person_checked_out: "", item_keywords: "robot arm cobot manipulation", item_notes: "6-axis collaborative robot", item_picture_url: "" },
  { _id: "demo-2", item_name: "Velodyne VLP-16 LiDAR", item_id_numbers: "RASL-SEN-014", item_storage_loc: "Lab A / Cage", item_checked_out: true, person_checked_out: "J. Cuomo", item_keywords: "lidar sensor perception", item_notes: "16-channel, needs calibration", item_picture_url: "" },
  { _id: "demo-3", item_name: "Jetson AGX Orin Dev Kit", item_id_numbers: "RASL-CMP-032", item_storage_loc: "Lab B / Shelf 3", item_checked_out: false, person_checked_out: "", item_keywords: "nvidia jetson compute edge", item_notes: "64GB dev kit", item_picture_url: "" },
  { _id: "demo-4", item_name: "DJI Matrice 300 RTK", item_id_numbers: "RASL-UAV-007", item_storage_loc: "Hangar / Locker 2", item_checked_out: true, person_checked_out: "K. Freeman", item_keywords: "drone uav aerial", item_notes: "Batteries TB60 x2", item_picture_url: "" },
  { _id: "demo-5", item_name: "Fluke 87V Multimeter", item_id_numbers: "RASL-TOL-101", item_storage_loc: "Lab B / Bench 1", item_checked_out: false, person_checked_out: "", item_keywords: "multimeter electronics test", item_notes: "", item_picture_url: "" },
];

export const DEMO_USER = { isLoggedIn: true, email: "demo@lab.local", first_name: "Demo", last_name: "Admin" };
