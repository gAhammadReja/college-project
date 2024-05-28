let stateHead;



function myCollege(college,photo,college_type,semester_fees,addmission_fees,department,district,state){
    college = college.toUpperCase();
    college_type = college_type.toUpperCase();
    department = department.toUpperCase();
    district = district.toUpperCase();
    state = state.toUpperCase();
    let MySrc = "https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q="+college+"&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed";
    document.getElementById('colleges').innerHTML=`
      <div class="college-profile">
        <h1 class="college-name">My College</h1>
        <div class="college-info">
            <img src="https://collegeserver.onrender.com/photos/${photo}" alt="Welcome To My College">
            <div class="map-container">
                <iframe class="map-iframe" frameborder="0" scrolling="no"
                    marginheight="0" marginwidth="0"
                    src="${MySrc}" allowfullscreen></iframe>
            </div>
            <div class="details">
                <p>College Type: ${college_type}</p>
                <p>Semester Fees: ${semester_fees}</p>
                <p>Admission Fees: ${admission_fees}</p>
                <p>Departments: ${department}</p>
                <p>District Name: ${district}</p>
                <p>State Name: ${state}</p>
            </div>
            <div class="favorite">
                <span class="heart-icon">&#10084;</span> <!-- Heart icon for favorites -->
            </div>
        </div>
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

window.onload = function() {
    filterCollege('https://collegeserver.onrender.com/filter');
};
