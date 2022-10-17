
import '@babel/polyfill'

import {signup,login,logout,switchDark} from './auth'
import{todayTask,upcomingTask,completedTask,pendingTask,createTask,markDone,deleteTask,clearAllTask} from './task'


const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector(' .login-form form')
const dashboardWrapper = document.querySelector('.dashboard-section');

//SIGNUP......
if(signupForm){
    const form = document.querySelector('.signup-form form');
    const name = document.querySelector('.name input');
    const email = document.querySelector('.email input');
    const eye = document.querySelector('.eye-password');
    const password = document.querySelector('.password input');
    const eyeC = document.querySelector('.eye-close');
    const eyeO = document.querySelector('.eye-open');
    form.addEventListener('submit',function(e){
        e.preventDefault();
        
        signup(name.value,email.value,password.value);


    })
    eye.addEventListener('click',function(){

        eyeC.classList.toggle('eye-close-state');
        eyeO.classList.toggle('eye-open-state');
        if(eyeC.classList.contains('eye-close-state')){
            password.type='text';
        }
        else password.type='password';
    })
}
//LOGIN...
if(loginForm){
    const form = document.querySelector(' .login-form form');
    const email = document.querySelector('.email input');
    const eye = document.querySelector('.eye-password');
    const password = document.querySelector('.password input');
    const eyeC = document.querySelector('.eye-close');
    const eyeO = document.querySelector('.eye-open');
    form.addEventListener('submit',function(e){
        e.preventDefault();
        
        login(email.value,password.value);

    })
    eye.addEventListener('click',function(){

        eyeC.classList.toggle('eye-close-state');
        eyeO.classList.toggle('eye-open-state');
        if(eyeC.classList.contains('eye-close-state')){
            password.type='text';
        }
        else password.type='password';
    })

}


//DASHBOARD.....
if(dashboardWrapper){

    
   const send = document.querySelector('.send-svg');
   const todayBtn = document.querySelector('.today-title');

const createBtn = document.querySelector('.create');
const overlay = document.querySelector('.overlay');
const taskWrapper = document.querySelector('.task-create-wrapper');
const cross = document.querySelector('.cross-svg');
const bd = document.documentElement;
const mainSection = document.querySelector('.main-section')
const taskContainer = document.querySelector('.my-task-container');
const lists = document.querySelectorAll('.task-titles li');
const myTask = document.querySelector('.my-task')

window.addEventListener('load',function(){
    todayBtn.click();
})
myTask.addEventListener('click',function(){
    location.assign('/dashboard');
})


send.addEventListener('click',function(){
const content = document.querySelector('.task-text');
const endDate = document.querySelector('.date-pick').value;
const endFinalDate = new Date(`${endDate}:0:0:0`);
overlay.classList.remove('overlay-state');
const todayWrapper = document.querySelector('.today')
taskWrapper.classList.remove('task-wrapper-state');
createTask(content.value,endFinalDate,todayWrapper);
})
const textarea = document.querySelector('textarea')

textarea.addEventListener('keyup',function(){
   const sendSvg = document.querySelector('.send-svg')
    if(this.value==""||!this.value) sendSvg.classList.remove('send-svg-state');
    else sendSvg.classList.add('send-svg-state')
})


createBtn.addEventListener('click',function(){
        overlay.classList.add('overlay-state');
        taskWrapper.classList.add('task-wrapper-state');
   

})

cross.addEventListener('click',function(){
    overlay.classList.remove('overlay-state');
    taskWrapper.classList.remove('task-wrapper-state');

})



lists.forEach((list)=>{

    list.addEventListener('click',function(e){
        const el =  list.dataset.title;
         const wrapper = document.querySelector(`.${el}`);
         const activeEl = document.querySelector('.active-wrapper');
         const titlesStateEl = document.querySelector('.titles-state') ;
         titlesStateEl.classList.remove('titles-state');
         list.classList.add('titles-state');
         activeEl.classList.remove('active-wrapper');
         wrapper.classList.add('active-wrapper');

       
    })

})


//CALLING TOADY......
const today = document.querySelector('.today-title');
const todayWrapper = document.querySelector('.today')



today.addEventListener('click',async function(){
    
    await todayTask(todayWrapper);
const doneP = document.querySelectorAll('.mad');
doneP.forEach((md)=>{
    md.addEventListener('click',function(){
        const parent = md.closest('.task-card');
        const id = md.getAttribute('id');
       
        markDone(parent,id);
        
    })
})
const deleteBtn = document.querySelectorAll('.delete');
if(deleteBtn){
    console.log(deleteBtn)
  deleteBtn.forEach((task)=>{
    task.addEventListener('click', function(){
        
        const parent = this.closest('.task-card');
        deleteTask(this.getAttribute('id'),parent);
    })
  })
}

    
})



//CALLING UPCOMING......
const upcoming = document.querySelector('.upcoming-title');
const upcomingWrapper = document.querySelector('.upcoming')
upcoming.addEventListener('click',function(){
    
   upcomingTask(upcomingWrapper)
    
})
//CALLING COMPLETED.....
const completed = document.querySelector('.completed-title')
const completedWrapper = document.querySelector('.completed')
const clearAll = document.querySelector('.clear-all p');
completed.addEventListener('click',async function(){
    
  await completedTask(completedWrapper);
 
if(!document.querySelector('.completed-wrapper .note-err')){
    document.querySelector('.completed-wrapper .clear-all').classList.add('clear-all-state')
}
else{
    document.querySelector('.completed-wrapper .clear-all').classList.remove('clear-all-state')

}

clearAll.addEventListener('click',function(){
    
    const parent = document.querySelector('.completed');
    clearAllTask(parent);
    document.querySelector('.completed-wrapper .clear-all').classList.remove('clear-all-state')
})

    
})
const pending = document.querySelector('.pending-title')
const pendingWrapper = document.querySelector('.pending')
pending.addEventListener('click',async function(){
   
await pendingTask(pendingWrapper);
const doneP = document.querySelectorAll('.mad');
doneP.forEach((md)=>{
    md.addEventListener('click',function(){
        const parent = md.closest('.task-card');
        const id = md.getAttribute('id');
        
        markDone(parent,id);
        
    })
})
    
})

//MARKS AS DONE , DELETE,ETC,FEATURES HANDLING.....


//  markDone.forEach((md)=>{
    
//     md.addEventListener('click',function(e){
//         console.log('clicked!')
//     })
//  })


//LOGOUT..........
const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click',function(){
   
    logout();
})
const menuList = document.querySelectorAll('.menu li');
menuList.forEach((list)=>{
    list.addEventListener('click',function(){
        const curListState = document.querySelector('.menu-state');
        curListState.classList.remove('menu-state');
        this.classList.add('menu-state');
        
    })
})
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const sidebarSwitch = document.querySelector('.sidebar');
const mainSwitch = document.querySelector('.main-section');
const taskSwitch = document.querySelector('.task-titles');
const darkSvg = document.querySelector('.svg-dark');
const svgMode = document.querySelector('.svg-dark');
const menu = document.querySelector('.menu ')
if(document.querySelector('.dashboard-wrapper').dataset.dark=='dark'){
    mainSwitch.classList.toggle('main-dark');
    taskSwitch.classList.toggle('task-titles-state')
    sidebarSwitch.classList.toggle('sidebar-dark')
    menu.classList.toggle('menu-link-state')
    
    svgMode.classList.add('dark')
}
darkSvg.addEventListener('click',function(){
    console.log('svg cliccked!')
    let checked;
    if(!svgMode.classList.contains('dark')){
        checked = true;
        svgMode.classList.add('dark')
        taskSwitch.classList.add('task-titles-state')
        mainSwitch.classList.add('main-dark');
        menu.classList.add('menu-link-state')
        menu.style.color ='#868e96';
        sidebarSwitch.classList.add('sidebar-dark')
    }
    else {
        checked  =false;
        mainSwitch.classList.remove('main-dark');
        sidebarSwitch.classList.remove('sidebar-dark')
        taskSwitch.classList.remove('task-titles-state')
        menu.classList.remove('menu-link-state')
        menu.style.color = '#343a40'
        svgMode.classList.remove('dark')
    }
  
    switchDark(checked);


})
//DELETE......


}