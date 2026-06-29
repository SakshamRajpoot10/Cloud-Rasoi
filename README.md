# Cloud Rasoi 🍲

Cloud Rasoi is a premium, fully-responsive, database-backed cloud kitchen discovery and food ordering web application. The design is inspired by the organic, premium aesthetic of `palais.bio` with custom morphing liquid blobs, parallax animations, and clean layouts.

---

## 📁 Folder Structure

```text
Cloud Rasoi/
├── backend/            # Spring Boot REST API (Java 17+, Maven, H2 In-Memory SQL Database)
├── frontend/           # React + Vite Client (JavaScript, Vanilla CSS, Lucide Icons)
├── run_project.bat     # One-click startup script for Windows
├── run_project.sh      # One-click startup script for macOS / Linux
└── README.md           # Documentation (this file)
```

---

## 🛠️ Prerequisites

To run this application, make sure you have the following installed on your system:
1. **Java Development Kit (JDK) 17** or higher.
2. **Node.js** (v18 or higher) & **npm**.

---

## 🚀 How to Run the Project

### Option 1: One-Click Automatic Startup (Recommended)

*   **On Windows**:
    Simply double-click the [run_project.bat](file:///c:/Users/315082/OneDrive/Desktop/Cloud%20Rasoi/run_project.bat) file in the root folder. It will launch the backend and frontend in separate terminal windows, wait 10 seconds, and open the app in your browser.
*   **On macOS / Linux**:
    Open your terminal in the root folder and run:
    ```bash
    chmod +x run_project.sh
    ./run_project.sh
    ```

---

### Option 2: Running Manually via Terminal

If you prefer to run the components manually, open two terminal windows:

#### 1. Start the Backend (Spring Boot)
Navigate to the `backend` directory and run the Maven wrapper:
```bash
cd backend
# On Windows
mvnw.cmd spring-boot:run
# On macOS / Linux
./mvnw spring-boot:run
```
*The backend will start on **http://localhost:8080***.

#### 2. Start the Frontend (React + Vite)
Navigate to the `frontend` directory, install dependencies (if running for the first time), and start the development server:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start on **http://localhost:5173***.

---

## 🔑 Default Login Credentials

Use the following pre-seeded account to test the ordering, address management, and checkout flows:
*   **Username**: `customer`
*   **Password**: `password`

---

## 🌟 Key Features & Implementation Details

1.  **Rebranded Homepage**: Restored Palais-inspired landing page featuring wavy dividers, organic floating ingredients, and an interactive "Order Now" flow.
2.  **Responsive Navigation Header**: Tablet and mobile-responsive header featuring an animated slide-out **Hamburger Menu Drawer** to prevent any overlapping or text truncation on small viewports.
3.  **H2 Database Authentication**: Fully active sign-up and login forms connected to a persistent H2 SQL database.
4.  **Multiple Saved Addresses**: Users can save multiple addresses (e.g., *Home*, *Work*, *Other*) with custom labels, selectable via radio cards during checkout.
5.  **GPS Geolocation**: Fetch your real-time coordinates using the browser's Geolocation API, or select manual city presets.
6.  **Clue Meter (Haversine Distance)**: Displays the exact distance in kilometers from your location to each cloud kitchen using the Haversine formula on the frontend.
7.  **Dual Search (Kitchens & Dishes)**: Search for dishes (e.g., "biryani") to view matching kitchens and add dishes directly to your cart from the search grid.
8.  **Veg / Non-Veg Indicators**: Authentic square borders with colored center dots (green for Veg, red for Non-Veg) applied to all menu cards and cart items.
9.  **Veg Only Toggle Switch**: A global green toggle switch (available in the explorer and menu views) that filters out non-veg items, hides non-veg restaurants, and collapses empty categories.
10. **Parallax Motion**: Background fluid blobs and floating ingredients translate and rotate dynamically based on mouse movement.
