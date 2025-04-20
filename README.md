# 💸 PenaltySaver - Cash Flow Minimizer

An intelligent scheduling algorithm to minimize cash outflow and penalties by optimizing payment deadlines.

---

## 🚀 Overview

This project simulates a real-world scenario where financial obligations must be fulfilled while minimizing total cost, including penalties for late payments. It uses a greedy strategy based on cost-penalty impact to determine the most optimal payment schedule.

---

## 📊 Features

- Accepts job inputs: Deadline, Cost, and Penalty
- Calculates optimized payment scheduling
- Identifies late jobs and applies penalties
- Computes total and extra cost
- Command-line based simulation in Java

---

## 🧠 Tech Stack

- Java (Core logic)
- Spring Boot (for backend API - planned)
- React.js / Next.js (for frontend - planned)

---

## 🛠 How It Works

1. User inputs multiple jobs with:
   - `Deadline` (day by which payment should be done)
   - `Cost` (amount to be paid)
   - `Penalty` (per day if paid after the deadline)

2. The algorithm:
   - Sorts jobs by `cost × penalty` (highest first)
   - Assigns jobs to earliest possible days before the deadline
   - Applies penalties for any jobs that miss their deadline
