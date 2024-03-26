document.addEventListener("DOMContentLoaded", function () {
  const matchButton = document.getElementById("matchButton");
  const entrepreneurListDiv = document.getElementById("entrepreneur-list");
  const studentListDiv = document.getElementById("student-list");
  const matchesDiv = document.getElementById("matches");

  // โหลดข้อมูล JSON และแสดงผู้ประกอบการและนักศึกษาฝึกงาน
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const entrepreneurs = data.entrepreneurs;
      const students = data.students[0];

      entrepreneurs.forEach((entrepreneur) => {
        const entrepreneurElement = document.createElement("div");
        entrepreneurElement.textContent = `Name: ${entrepreneur.Ename}, Skill: ${entrepreneur.Eskill}`;
        entrepreneurListDiv.appendChild(entrepreneurElement);
      });

      students.forEach((student) => {
        const studentElement = document.createElement("div");
        studentElement.textContent = `Name: ${student.Sname}, Skill: ${student.Sskill}`;
        studentListDiv.appendChild(studentElement);
      });

      matchButton.addEventListener("click", function () {
        // ทำการจับคู่ข้อมูล และแสดงผลลัพธ์
        matchesDiv.innerHTML = ""; // เคลียร์ข้อมูลที่แสดงผลเก่าออกไปก่อน
        const matches = [];
        entrepreneurs.forEach((entrepreneur) => {
          students.forEach((student) => {
            if (entrepreneur.Eskill === student.Sskill) {
              matches.push({
                Entrepreneur: entrepreneur.Ename,
                Intern: student.Sname,
                EntrepreneurSkill: entrepreneur.Eskill,
                InternSkill: student.Sskill,
                Ephoto: entrepreneur.EPhoto,
                Sphoto: student.SPhoto
              });
            }
          });
        });

        if (matches.length > 0) {
          matches.forEach((match) => {
            const matchElement = document.createElement("div");
            matchElement.textContent = `Entrepreneur: ${match.Entrepreneur} Photo:${match.Ephoto}, Intern: ${match.Intern}, Skill: ${match.EntrepreneurSkill}`;
            matchesDiv.appendChild(matchElement);
          });
        } else {
          const noMatchElement = document.createElement("div");
          noMatchElement.textContent = "No matches found.";
          matchesDiv.appendChild(noMatchElement);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
});
