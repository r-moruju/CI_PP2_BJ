# Blackjack Card Game (light version)

**Developer: Razvan Moruju**

[Live website](https://r-moruju.github.io/CI_PP2_BJ/)

![Mockup image](docs/am-i-responsive.png)

## Table of Content
  - [Project Goals](#project-goals)
    - [User Goals](#user-goals)
    - [Site Owner Goals](#site-owner-goals)
  - [User Experience](#user-experience)
    - [Target Audience](#target-audience)
    - [User Requirements and Expectations](#user-requirements-and-expectations)
  - [User Stories](#user-stories)
    - [Site User](#site-user)
    - [Site Owner](#site-owner)
  - [Design](#design)
    - [Colour Scheme](#colour-scheme)
    - [Fonts](#fonts)
    - [Structure](#structure)
    - [Wireframes](#wireframes)
  - [Technologies Used](#technologies-used)
    - [Languages](#languages)
    - [Frameworks, Libraries & Tools](#frameworks-libraries--tools)
  - [Features](#features)
  - [Validation](#validation)
    - [HTML Validation](#html-validation)
    - [CSS Validation](#css-validation)
    - [JavaScript Validation](#javascript-validation)
    - [Accessibility](#accessibility)
    - [Performance](#performance)
  - [Testing](#testing)
    - [Performing tests on various devices](#performing-tests-on-various-devices)
    - [Browser compatibility](#browser-compatibility)
    - [Testing user stories](#testing-user-stories)
  - [Bugs](#bugs)
  - [Deployment](#deployment)
  - [Credits](#credits)
  - [Acknowledgements](#acknowledgements)

  ## Project Goals

The goal of this project was to create a light version of a well-known casino card game, Blackjack.

### User Goals

- Play a game with simple rules that is fun and engaging
- To practice their Blackjack skills

### Site Owner Goals

- Create a game which is entertaining and engaging
- Create a simple navigation around website
- Provide a fully responsive and accessible website

## User Experience

### Target Audience

- The game can be played by anyone who likes Blackjack card game
- Anyone who wants to test their Blackjack skills

### User Requirements and Expectations

- Easy to understand game rules
- Simple navigation
- Simple presentation of content on the page that makes logical sense
- A responsive wesite that allows the user to play the game on any devise
- Links and functions that work as expected
- An easy way to contact the developer and leave feedback
- Accessibility

## User Stories

### Site User

1. I want to easily understand the rules of the game
2. I want to enter my name and have it visible on screen while the game is played
3. I want to be able to change the bet amount
4. I want to be able to choose the amount of credit to be deposited
5. I want to test my blackjack skills in a quiz
6. I want to see what astrology says about my luck if I'm a superstitious player
7. I want to see results after a game round
8. I want to be able to play the game on desktop, tablet and mobile devices
9. I want to be able to get in touch with the developer
10. I want to be sure that my message has been sent

### Site Owner

11. I want user to easily understand the game
12. I want the user to be able to challenge their skills
13. I want my game to be fully responsive
14. I want the user to come to a 404 error page instead of having to use the browser back button if they enter a url that does not exist
15. I want user to be able to contact me and provide their feedback

## Design

### Colour Scheme

The colour scheme across the screens was kept simple and consistent and was inspired by the red color, which is often used on casino card games.

The pallet used was found on [ColorSpace](https://mycolor.space/?hex=%23FF0000&sub=1)
<img src="docs/color-pallette.png">

### Fonts

Google Fonts were implemented on the website. Rubik Dirt was used across all screens as I found it to brings a old western aspect specific to casino games.

### Structure

The structure of the website was designed to be easy to learn and navigate. Each page of the website have the same background image that returns a casino atmosphere to the user

#### The website consist of the following pages:
- A home page that contain:  
  - Welcome modal window when the user arrives that provides instructions about the game and allows the user to enter their name and credit amount
  - Main game screen - where the players cards are displayed, together with the action buttons and hands values
  - Screen with a modal window that appear after a game round has finished, displaying the results of the round
  - Screen with a modal window that appear when the player does not have enough credits to play the hand
  - A modal with daily horoscope that appear when the user click the "Luck" link on the navigation
- A page with a quiz where the user can test their blackjack skills
- The contact page with contact form which allows users to send an email to the developer and provide their feedback
- A separate 404 error page

### Wireframes

<details><summary>Home welcome modal</summary>
<img src="docs/wireframes/home-wellcome.png">
</details>
<details><summary>Home game screen</summary>
<img src="docs/wireframes/home-main.png">
</details>
<details><summary>Home round result</summary>
<img src="docs/wireframes/main-hand-end.png">
</details>