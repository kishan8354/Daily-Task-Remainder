# Daily LLM Automation – Coding & CS Concepts Revision System
<img width="1346" height="618" alt="image" src="https://github.com/user-attachments/assets/5e640580-c39f-44f8-8ebb-7042a36d07ea" />
<img width="1029" height="618" alt="image" src="https://github.com/user-attachments/assets/317e4073-120b-438f-8126-9018fd225764" />


This project is an **LLM-powered daily revision automation system** that sends you a personalized email every morning containing:

- 2 Coding Questions due for revision  
- 2 New Coding Questions to learn  
- Daily OOPS Concept explanation  
- Daily Operating System Concept explanation  
- Advanced DSA Topic of the Day  
- AI-generated concise C++17 solutions  

The entire workflow runs automatically using **Google Sheets**, **Google Apps Script**, and **Gemini API**.

---

## Features

### 1. Automated Daily Email
Every morning, you receive an email containing:
- Due revision questions  
- Fresh questions  
- AI-generated solutions in HTML  
- Rotating OOPS, OS, and DSA advanced topics  
- Preserved hyperlinks from the sheet  

---

### 2. Spaced Repetition Engine
Each question row contains:

- `Revision Date`
- `Stage`

After each revision:
- Stage increments  
- Next revision date is calculated using intervals:  
-[3, 7, 15, 30, 45, 60, 80, 120]

---

### 3. Google Sheets as Database
Your Google Sheet stores:
- Topic  
- Question  
- Company  
- Revision date  
- Stage  
- Hyperlinked question URLs  

---

### 4. Gemini-Powered C++ Solutions
The script generates high-quality HTML outputs for each question:

Sections:
- Approach  
- C++17 Implementation  
- Complexity & Edge Cases  

---

## Technology Stack

| Component | Purpose |
|----------|---------|
| Google Sheets | Stores all questions |
| Google Apps Script | Automation engine |
| Gmail | Email sender |
| Gemini API | AI answers generator |
| Script Properties | Secure API key storage |

---

## Project Structure
<img width="446" height="287" alt="image" src="https://github.com/user-attachments/assets/7d9bb4e4-f2c7-4974-97ab-f8e3cf36c807" />

---

## Google Sheet Format

Your Sheet must contain these columns:

| Column Name | Description |
|-------------|-------------|
| Topic | Topic name / DSA category |
| Question | Hyperlinked question text |
| Company | Optional |
| Revision Date | Next revision date |
| Stage | SRS stage |

Example:

| Topic | Question | Company | Revision Date | Stage |
|-------|----------|---------|----------------|--------|
| Arrays | Two Sum | Google | 2025-01-01 | 1 |

---

## Deployment Guide

### Step 1: Create Google Sheet
1. Go to https://sheets.google.com  
2. Create the required columns  
3. Add questions (keep hyperlinks)

---

### Step 2: Add Apps Script
1. In Google Sheet → Extensions → Apps Script  
2. Delete default code  
3. Paste your entire `main.gs` (this project’s script)

---

### Step 3: Add Gemini API Key
Inside Apps Script:

1. Open **Project Settings**  
2. Under **Script Properties**,
3. add:-Key: GEMINI_API_KEY
       -Value: your_api_key_here

---

### Step 4: Give Required Permissions
First time running:

1. Run function → `runDaily()`  
2. Approve permissions:  
   - Gmail send  
   - Sheets read/write  
   - External API  

---

### Step 5: Set Daily Trigger
1. Apps Script → Triggers  
2. Add new trigger:  
   - Function: `runDaily`  
   - Type: Time-driven  
   - Frequency: Daily  
   - Time: 6 AM – 9 AM IST  

Your system is now **fully automated**.

---

## Email Output Includes

- Due Revision Questions  
- New Questions  
- AI HTML solutions (C++17)  
- Daily OOPS Concept  
- Daily OS Concept  
- Advanced DSA Topic  

All formatted cleanly in HTML.

---

## Troubleshooting

### Email not sending?
- Check Gmail quota  
- Verify trigger is active  

### Model not found?
- Update fallback Gemini models in script  

### Columns not detected?
- Column names must match exactly  

---

## Contact
Created by **Kishan Kushavaha**  
A fully automated personal LLM revision system.

If you want:
- A diagram of full architecture  
- A GitHub badge header  
- A workflow diagram  
- Screenshot previews  

Just ask!


