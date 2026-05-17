const descriptions = {
  ja: "勤務時間は数字だけ入力してください。<br>例：230 と入力すると 2 時間 30 分（2:30）と表示されます。",
  en: "Please enter numbers only.<br>For example, entering “230” will display as 2 hours 30 minutes (2:30).",
  tl: "Pakilagay lamang ang mga numero.<br>Halimbawa, kapag naglagay ka ng “230”, lalabas ito bilang 2 oras at 30 minuto (2:30).",
  vi: "Vui lòng chỉ nhập số.<br>Ví dụ: nhập “230” sẽ hiển thị thành 2 giờ 30 phút (2:30).",
  th: "กรุณากรอกเฉพาะตัวเลขเท่านั้น<br>ตัวอย่าง: ป้อน “230” จะแสดงเป็น 2 ชั่วโมง 30 นาที (2:30)",
  lo: "ກະລຸນາໃສ່ຕົວເລກເທົ່ານັ້ນ<br>ຕົວຢ່າງ: ໃສ່ “230” ຈະສະແດງເປັນ 2 ຊົ່ວໂມງ 30 ນາທີ (2:30)",
  id: "Silakan masukkan angka saja.<br>Contoh: jika Anda memasukkan “230”, akan tampil sebagai 2 jam 30 menit (2:30)."
};

const footerMessages = {
  ja: "今月もお疲れ様でした。",
  en: "Thank you for your hard work this month.",
  tl: "Maraming salamat sa iyong trabaho ngayong buwan.",
  vi: "Cảm ơn bạn vì sự làm việc chăm chỉ trong tháng này.",
  th: "ขอบคุณสำหรับความพยายามของคุณในเดือนนี้",
  lo: "ຂອບໃຈສໍາລັບຄວາມພະຍາຍາມຂອງທ່ານໃນເດືອນນີ້",
  id: "Terima kasih atas kerja keras Anda bulan ini."
};

document.getElementById("description").innerHTML = descriptions.ja;
document.getElementById("footerMessage").innerHTML = footerMessages.ja;

const inputsDiv = document.getElementById("inputs");

for (let i = 1; i <= 31; i++) {
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `
    <label>${i}</label>
    ➡
    <input type="text" data-day="${i}">
  `;
  inputsDiv.appendChild(row);
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    let v = input.value.replace(/\D/g, "");
    if (v.length >= 3) {
      let h = v.slice(0, -2);
      let m = v.slice(-2);
      input.value = `${h}:${m}`;
    }
    calc();
  });
});

function calc() {
  let totalMin = 0;
  let days = 0;

  document.querySelectorAll("input").forEach(input => {
    if (input.value.includes(":")) {
      days++;
      let [h, m] = input.value.split(":").map(Number);
      totalMin += h * 60 + m;
    }
  });

  let th = Math.floor(totalMin / 60);
  let tm = totalMin % 60;

  document.getElementById("total").textContent =
    `${String(th).padStart(2, "0")}:${String(tm).padStart(2, "0")}`;
  document.getElementById("days").textContent = days;
}

document.querySelectorAll(".lang-scroll button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-scroll button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let lang = btn.dataset.lang;
    document.getElementById("description").innerHTML = descriptions[lang];
    document.getElementById("footerMessage").innerHTML = footerMessages[lang];
  });
});
