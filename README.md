# GithubRecruitmentTool

## Problem & Motivations
Currently, the MYOB's recruitment process is very inefficient and requires a lot of manual work from recruiters. The step by step process includes:
* Recruiter sends a coding challenge to a candidate via email
* The candidate receives the problem, choose a suitable technology/language to solve the problem, and send an email back to the recruiter when he/she finished the code. Now, this can be in many different format eg, dropbox, zip file, links...
* The recruiter receives the email and forward the solution to managers of teams with vacancies. 
* Managers assign technical reviewers to assess the solution and determine the technical competency of the candidate.
* Technical reviewers send feedbacks to the recruiter.
* The recruiter then send feedback to the candidate.

This is not scalable as it requires a lot of work from the recruiter and reviewers. Further, reviewers would like to see the process, develoment methodology and coding practices used by the candidate in solving the problem. This can be done through examining the commit history. However, submissions in the type of zipfile, or dropbox do not contain the commit history. Hence, MYOB wants to simplify and standardise the recruitment process by using Github and a tool to streamline that process. The main users of the tool will be recruiters which might not be technical. 

## Description
A tool that will simplify and standardise the process recruiters from HR technically assess candidates for a software development job. The tool will streamline the process so that recruiters do not need to know how to use GitHub but be able to set up everything for the candidate.

## Key Features

- Authourisation (Login)
- View list of candidates being assessed
- Add new candidate for assessment (Create GitHub repo with challenge and add candidate as collaborator)
- Allow technical reviewer to assess candidate's solution (Add reviewer as collaborator in GitHub repo and provide feedback form)
- Sending email to notify relevant users (New candidate, development managers, recruiters)

## Technologies

- Frontend Client-side: Angular 4 (4.4.3)
- Backend Server-side: NodeJS (v6)
- DB: Firebase (3.9)
- Others: GitHub API, AWS Hosting
- Project Management: Trello, Slack, Google Drive

## Running application

1. Install NodeJS (https://nodejs.org/en/download/) (The application was built using Node v6 LTS)
2. Install Angular Core by running `npm install -g angular-cli`
3. Clone the project to a directory
4. Run `npm install` to install all dependencies
5. Run `ng build` to build the angular components
6. Run `node app.js` to run the node server and built angular components (May need to run `sudo node app.js` for admin access)

The application will start up, you can access it by opening `http://localhost:80` in a web browser.

## Folder structure

- `dist` - Distribution folder generated by Angular4 after running `ng build`. 
- `src` - Angular4 source files
- `server` - NodeJS source files 

## Authors:

| Name  | UPI | Github ID |
| ------------- | ------------- | ------------- |
| Van Pham (John)  | dpha010  | JohPa8696 |
| Aaron Zhong  | azho472 | azho472 |
| Stella Li  | hli936  | lhystella |
| Waleed Al-saady  | wals005  | wal88 |
| Jay Pandya  | jpan889  | bawse |
| Sudara Fernando  | wfer594  | wsimf |
| Kaimin Li (Alex) | kli438  | Humbis |


## Acknowledgement
NFuse would like give a humungous thank to our customers, Shailan Patel, Karen Xie, Mark Pearl, Darren Sim and Lucas Rainett, for their guidances throughout this project. 
