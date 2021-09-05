# React JS R&D

React JS research & development team's demo and tutorial files.


## Lessons 1 & 2

### Overview
In the first lesson we will be installing Node Js and React, and in the second lesson we will create a basic **To Do List** app.

## Lesson 1
### 1. Install Node JS on your machine.
[Download Node JS](https://nodejs.org/en/) from here. As of writing this tutorial, the latest version I am using is `14.17.5 LTS`. Once download has completed, install it. After installation has completed you can verify the installation by running the commands in your teminal/cmd:

- `node -v`
> Mine is 14.17.5

- `npm -v`
> Mine is 6.14.14

### 2. Install Code Editor of your choice.
You can use any editor of your choice however I particularly like Sublime Text, Visual Studio Code & Atom. For this series of tutorial, I will be using Visual Studio Code (VSCode).

You can download the latest version of VSCode from here:
[Visual Studio Code](https://code.visualstudio.com/download)

### 3. Let's get started
Firstly lets install React:
There are two options:
- Option 1:
 1. Create a project folder
 2. Change to the project folder
 3. Create a package.json file
 4. Install React and other modules you choose
 
 - Option 2:
1. Install **Create-React-App** package to simplify the process of creating and installing React into your projects.

I will choose option 2 and install React globally so that i won't have to repeat steps a-d every time i create a new react project.

### 4. Install React
`npm install -g create-react-app`

This will install the 'create-react-app' package globally.

#### Now you can create React App using the command:
`create-react-app hello-world`

This will create hello-world app on your working directory.
>**IMPORTANT:** Before you create app, you might want to organise your projects. For example Your working directory could be:
>Documents/Work/React/test-app

#### Open the hello-world directory
`cd hello-world`

#### Start the server
`npm start`

This will start the development server. If Windows defender pops up, allow access.

If you have followed the steps correctly so far, your default browser will open up and you will see spinning "React" logo. This is the default for all React apps. Congratulations! You have successfully created a react app.


## Lesson 2:

In this Lesson we will create a basic To Do List. Let's get started.

### 1. Create a new React app
`npm create-react-app todo-list`

### 2. Once app is created, change your working directory to the app
`cd todo-list` 

### 3. Start the development server
`npm start`

### 4. Once development server starts, and you see the app is running (Default React app)

 1. Goto your source folder and delete contents within the **_src_** folder.
 2. Then, create an **index.js** file within the **_src_** folder.
 3. In index.js import the following:
 - `import React from ‘react’;`
 -  `import ReactDOM from ‘react-dom’;`

### 5. Create app.css file and paste the below code

    body {
    background-color: #000;
    }
    
    .container {
    padding: 15px;
    color: #fff;
    }
    
    .title-container {
    text-align: center;
    }
    
    .comp1-container {
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 15px;
    background-color: #d1d1d1;
    color: #000;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    }
    
    .comp2-container {
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 15px;
    background-color: #d1d1d1;
    color: #000;
    }
    
    .text-center {
    text-align: center;
    }

### 6. Create app.js file and paste the code below

    import React, { useState } from 'react';
    import './app.css'; //Import the css we created
    
    function App() {
    const [usrIn, setUsrIn] = useState(''); //Create state for capturing user input and initialize to empty string
    const [list, setList] = useState([]); //State to maintain the user's todo list
    //in state, the first value is used to access the value, and the second value is used to set the value.
    
    //function to add todo item
    function addItem() {
    if (usrIn !== '') { //check if input is empty
    const newItem = {
    id: Math.random(), //generate random id
    value: usrIn //actual input by user
    }
    
    const newlist = [...list]; //spread operator to get the current list of todos
    newlist.push(newItem); //add the new added todo to the list
    setList(newlist); //save the list
    setUsrIn(''); //empty the input element
    }
    }
    
    //when user types into the input, the entered value is captured here and stored to the state variable
    function updateInput(event) {
    setUsrIn(event.target.value); //set the input value to the state
    }
    //when user click on the todo item, remove that item
    function removeItem(key) {
    //get the current list
    const currentList = [...list];  
    
    //from current list, filter and extract all items except the item that was clicked. We can do that by getting the id.
    
    const updatedList = currentList.filter(item => item.id !== key);
    
    //if the key that was passed is not same as the item's id, then store it in the updatedList. If key===item.id, then it will omit.
    
    setList(updatedList); //update the list
    }
    return (
    <div className="container">
    <div className="title-container">
    <h3>To Do List</h3>
    </div>
    <div className="comp1-container">
    <p>What do you want to do?</p>
    <input type="text" placeholder="Enter To Do......" onChange={updateInput} value={usrIn} />
    <button type="buttton" name="sub" onClick={addItem}>ADD</button>
    </div>
    {
    list.length > 0 ?
    (
    <div className="comp2-container">
    <ul>
    {
    list.map(items => {
    return (
    <li key={items.id} onClick={() => removeItem(items.id)}>{items.value}<hr/></li>
    )
    })
    }
    </ul>
    </div>
    )
    :
    (
    <div className="comp2-container">
    <p className="text-center">You have nothing to do? Such a lazy person!</p>
    </div>
    )
    }
    </div >
    );
    };
    
    export default App;

### 7. Come back to index.js:
Import the App.js we created:
`import App from ‘./app’;`

Render the app:
`ReactDOM.render(<App />, document.getElementById(‘root'));`

### 8. Done! App is ready.
Start the development server (if not already started)
`npm start`

## That is it for Lesson 1 & 2. See you in the next Lesson. 🙂
