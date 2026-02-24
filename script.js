document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("jobForm");
    const jobList = document.getElementById("jobList");
    const searchInput = document.getElementById("searchInput");
    const locationFilter = document.getElementById("locationFilter");
    const typeFilter = document.getElementById("typeFilter");
    const searchBtn = document.getElementById("searchBtn");
    const resetBtn = document.getElementById("resetBtn");
    const formTitle = document.getElementById("formTitle");

    let jobs = JSON.parse(localStorage.getItem("jobs"));
    let editIndex = null;

    /* PRE-ADDED JOBS */
    if (!jobs || jobs.length === 0) {
        jobs = [
            {
                title: "Software Engineer",
                company: "TCS",
                location: "Bangalore",
                salary: "7 LPA",
                experience: "2 Years",
                type: "Full-time",
                description: "Develop scalable enterprise applications.",
                applied: false
            },
            {
                title: "Web Developer",
                company: "Infosys",
                location: "Remote",
                salary: "5 LPA",
                experience: "1 Year",
                type: "Internship",
                description: "Build responsive websites.",
                applied: false
            },
            {
                title: "Data Analyst",
                company: "Google",
                location: "Mumbai",
                salary: "9 LPA",
                experience: "3 Years",
                type: "Full-time",
                description: "Analyze business data.",
                applied: false
            }
        ];
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }

    displayJobs();

    /* FORM SUBMIT */
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const job = {
            title: title.value,
            company: company.value,
            location: location.value,
            salary: salary.value,
            experience: experience.value,
            type: type.value,
            description: description.value,
            applied: false
        };

        if (editIndex !== null) {
            jobs[editIndex] = job;
            editIndex = null;
            formTitle.innerText = "Post a Job";
        } else {
            jobs.push(job);
        }

        localStorage.setItem("jobs", JSON.stringify(jobs));
        form.reset();
        displayJobs();
    });

    /* DISPLAY JOBS */
    function displayJobs() {
        jobList.innerHTML = "";

        jobs.forEach((job, index) => {

            const card = document.createElement("div");
            card.className = "job-card";

            card.innerHTML = `
                <span class="badge">New</span>
                <h3>${job.title}</h3>
                <p><b>${job.company}</b></p>
                <p>${job.location}</p>
                <p><b>Salary:</b> ${job.salary}</p>

                <button class="toggleBtn">View Details</button>

                <div class="details">
                    <p>Experience: ${job.experience}</p>
                    <p>Type: ${job.type}</p>
                    <p>${job.description}</p>
                    <button class="applyBtn">
                        ${job.applied ? "Applied ✔" : "Apply Now"}
                    </button>
                </div>

                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            `;

            card.querySelector(".toggleBtn").onclick = function () {
                const details = card.querySelector(".details");
                details.style.display =
                    details.style.display === "block" ? "none" : "block";
            };

            card.querySelector(".applyBtn").onclick = function () {
                jobs[index].applied = true;
                localStorage.setItem("jobs", JSON.stringify(jobs));
                displayJobs();
            };

            card.querySelector(".editBtn").onclick = function () {
                editIndex = index;
                formTitle.innerText = "Edit Job";
                title.value = job.title;
                company.value = job.company;
                location.value = job.location;
                salary.value = job.salary;
                experience.value = job.experience;
                type.value = job.type;
                description.value = job.description;
            };

            card.querySelector(".deleteBtn").onclick = function () {
                jobs.splice(index, 1);
                localStorage.setItem("jobs", JSON.stringify(jobs));
                displayJobs();
            };

            jobList.appendChild(card);
        });
    }

    /* SEARCH BUTTON */
    searchBtn.addEventListener("click", function () {

        const searchValue = searchInput.value.toLowerCase();
        const locationValue = locationFilter.value;
        const typeValue = typeFilter.value;

        const cards = document.querySelectorAll(".job-card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();
            const matchSearch = text.includes(searchValue);
            const matchLocation = locationValue === "" || text.includes(locationValue.toLowerCase());
            const matchType = typeValue === "" || text.includes(typeValue.toLowerCase());

            card.style.display = (matchSearch && matchLocation && matchType)
                ? "block"
                : "none";
        });
    });

    /* RESET BUTTON */
    resetBtn.addEventListener("click", function () {
        searchInput.value = "";
        locationFilter.value = "";
        typeFilter.value = "";
        displayJobs();
    });

});