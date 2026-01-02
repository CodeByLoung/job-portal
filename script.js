/* SHOW SECTION */
function show(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

/* USERS */
let users = JSON.parse(localStorage.getItem('users')) || [];
let jobs = JSON.parse(localStorage.getItem('jobs')) || [
  {title:'Frontend Developer', company:'Google'},
  {title:'Backend Developer', company:'Amazon'}
];
let internships = ['Web Intern','Software Intern','UI/UX Intern'];

/* REGISTER */
function register(){
  users.push({name:name.value, email:remail.value, password:rpassword.value});
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registered!');
  show('login');
}

/* LOGIN */
function login(){
  let user = users.find(u=>u.email===email.value && u.password===password.value);
  if(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
    userInfo.innerText = `Name: ${user.name}, Email: ${user.email}`;
    show('home');
  }else alert('Invalid credentials');
}

/* RESUME UPLOAD */
function uploadResume(){
  if(!resume.files[0]) return alert('Select resume');
  localStorage.setItem('resume', resume.files[0].name);
  resumeStatus.innerText = 'Uploaded: ' + resume.files[0].name;
}
if(localStorage.getItem('resume')) resumeStatus.innerText = 'Uploaded: '+localStorage.getItem('resume');

/* DISPLAY JOBS */
function displayJobs(list=jobs){
  jobList.innerHTML='';
  list.forEach(j=>{
    let li=document.createElement('li');
    li.innerHTML=`${j.title} - ${j.company} <button onclick="applyJob('${j.title}')">Apply</button>`;
    jobList.appendChild(li);
  });
  displayAppliedJobs();
}
displayJobs();

/* APPLY JOB */
function applyJob(title){
  let applied = JSON.parse(localStorage.getItem('appliedJobs'))||[];
  if(!applied.includes(title)) applied.push(title);
  localStorage.setItem('appliedJobs', JSON.stringify(applied));
  alert('Applied: '+title);
  displayAppliedJobs();
}

/* DISPLAY APPLIED JOBS */
function displayAppliedJobs(){
  appliedJobsList.innerHTML='';
  let applied = JSON.parse(localStorage.getItem('appliedJobs'))||[];
  applied.forEach(a=>{
    let li=document.createElement('li');
    li.innerText = a;
    appliedJobsList.appendChild(li);
  });
}

/* SEARCH JOBS */
function searchJobs(){
  let text = search.value.toLowerCase();
  displayJobs(jobs.filter(j=>j.title.toLowerCase().includes(text)));
}

/* INTERNSHIPS */
internshipList.innerHTML='';
internships.forEach(i=>{
  let li=document.createElement('li');
  li.innerHTML = `${i} <button onclick="alert('Applied')">Apply</button>`;
  internshipList.appendChild(li);
});

/* ADMIN LOGIN */
function adminAccess(){
  if(adminPassword.value==='admin123'){ // hardcoded password
    show('admin');
    displayAdminJobs();
  }else alert('Wrong Admin Password');
}

/* ADMIN PANEL */
function addJob(){
  jobs.push({title:jobTitle.value, company:jobCompany.value});
  localStorage.setItem('jobs', JSON.stringify(jobs));
  displayJobs();
  displayAdminJobs();
  alert('Job Added');
}

function displayAdminJobs(){
  adminJobList.innerHTML='';
  jobs.forEach((j,i)=>{
    let li=document.createElement('li');
    li.innerHTML=`${j.title} - ${j.company} <button onclick="deleteJob(${i})">Delete</button>`;
    adminJobList.appendChild(li);
  });
}

function deleteJob(i){
  jobs.splice(i,1);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  displayJobs();
  displayAdminJobs();
}
