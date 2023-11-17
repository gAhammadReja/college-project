let stateHead;



function myCollege(college,photo,college_type,semester_fees,addmission_fees,department,district,state){
    college = college.toUpperCase();
    college_type = college_type.toUpperCase();
    department = department.toUpperCase();
    district = district.toUpperCase();
    state = state.toUpperCase();
    let MySrc = "https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q="+college+"&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed";
    document.getElementById('colleges').innerHTML=`
    <div>
<h1 class="bg-pri p05">${college}</h1>
<div class="profile">
<img src='https://collegeserver.onrender.com/photos/${photo}' alt="Welcome To ${college}" class="profileImage">
    <div class="mapouter">
    <div class="gmap_canvas"><iframe class="gmap_iframe" frameborder="0" scrolling="no"
            marginheight="0" marginwidth="0"
            src="${MySrc}"></iframe>
        </div>
    </div>
</div>
<div style="display:flex;flex-wrap:wrap">
<div class="CollegeDetails">College Type : ${college_type}</div>
<div class="CollegeDetails">Semester Fees : ${semester_fees}</div>
<div class="CollegeDetails">Addmission Fees : ${addmission_fees}</div>
<div class="CollegeDetails">Depertments : ${department}</div>
<div class="CollegeDetails">District Name : ${district}</div>
<div class="CollegeDetails">State Name : ${state}</div>
</div>
<h2 class="btn-cancel" onclick="filterCollege('https://collegeserver.onrender.com/filter')"> BACK </h2>
    </div>
    `;
}
function toggle(id){
   let myId = document.getElementById(id);
    myId.classList.toggle('none');
}

document.getElementById('districtFilter').addEventListener("click",()=>{
    let filterName;
    filterName = document.getElementById('district').options[document.getElementById('district').selectedIndex].value;
    let url = `https://collegeserver.onrender.com/filter?district_name=${filterName}`;
    filterCollege(url);
})
document.getElementById('streamFilter').addEventListener("click",()=>{
    let filterName;
    filterName = document.getElementById('stream').options[document.getElementById('stream').selectedIndex].value;
    alert(filterName)
    let url = `https://collegeserver.onrender.com/filter?department=${filterName}`;
    filterCollege(url);
})
document.getElementById('collegeSearch').addEventListener("keyup",()=>{
    let url = `https://collegeserver.onrender.com/filter`;
    filterCollege(url);
})
function filterCollege(url){

    let CollegeId = document.getElementById("colleges");
    let SearchCollege = document.getElementById('collegeSearch').value;
    SearchCollege=SearchCollege.toUpperCase();

  let p = fetch(url)
    p.then((response)=>{
        return response.json();
    }).then((value2)=>{
    CollegeId.innerHTML='';

    for(let i=0;i<value2.length;i++){
    let college = value2[i].college_name;
        let Ucollege=college.toUpperCase();
        let len = (SearchCollege.length);
        let matchCollege=Ucollege.slice(0,len);
        const para = document.createElement("p");

            if(SearchCollege==matchCollege){
                para.innerHTML =`
            <div>${college}</div>
            <span>District Name: ${value2[i].district_name} </span><br>
            <span>Courses Offered: ${value2[i].department} </span>
            <button class="button" onclick="myCollege('${college}','${value2[i].photo}','${value2[i].college_type}','${value2[i].semester_fees}','${value2[i].admission_fees}','${value2[i].department}','${value2[i].district_name}','${value2[i].state_name}')">View Profile</button>
            `;
            CollegeId.appendChild(para);
        }  
    }
    });
}

window.onload(filterCollege(`https://collegeserver.onrender.com/filter`))
