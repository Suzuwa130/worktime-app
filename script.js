document.addEventListener("DOMContentLoaded", () => {
    const daysContainer = document.getElementById("days-container");

    for (let i = 1; i <= 31; i++) {
        const row = document.createElement("div");
        row.classList.add("day-row");

        const numberBox = document.createElement("div");
        numberBox.classList.add("day-number-box", getBgClass(i));
        numberBox.textContent = i;

const input = document.createElement("input");
input.type = "text";
input.placeholder = "0:00";

input.addEventListener("input", function () {
    convertTime(this);
    updateTotals();
});
   

function convertTime(input) {
    let value = input.value.replace(/[^0-9]/g, ""); // 数字以外を除去

    if (value.length >= 3) {
        let hours = parseInt(value.slice(0, -2), 10);
        let minutes = parseInt(value.slice(-2), 10);

        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;

        input.value = `${hours}:${minutes.toString().padStart(2, "0")}`;
    }
}

     row.appendChild(numberBox);
        row.appendChild(input);
        daysContainer.appendChild(row);
    }
});

/* 色分けルール */
function getBgClass(day) {
    if (day >= 1 && day <= 10) return "bg-ppink";
    if (day >= 11 && day <= 20) return "bg-pcream";
    if (day >= 21 && day <= 24) return "bg-pblue";
    if (day >= 25 && day <= 26) return "bg-pred";
    if (day >= 27 && day <= 31) return "bg-pgray";
    return "";
}

/* 合計時間と出勤日数の計算 */
function updateTotals() {
    let totalMinutes = 0;
    let workDays = 0;

    document.querySelectorAll("#days-container input").forEach(input => {
        const value = input.value.trim();
        if (value) {
            workDays++;

            const parts = value.split(":");
            if (parts.length === 2) {
                const h = parseInt(parts[0]) || 0;
                const m = parseInt(parts[1]) || 0;
                totalMinutes += h * 60 + m;
            }
        }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    document.getElementById("total-time").textContent =
        `${hours}:${minutes.toString().padStart(2, "0")}`;
    document.getElementById("work-days").textContent = workDays;
}

/* 多言語対応 */
const translations = {
    ja: {
        description: "勤務時間を入力して下さい。230と入力すると2：30と表示されます。順番に入力して下さい。一番下に合計時間と出勤日数が出ますので記入して下さい。",
        total: "合計時間",
        days: "出勤日数",
        footer: "今月もお疲れ様でした。いつも有難うございます。"
    },
    en: {
        description: "Please enter your working hours. If you enter 230, it will display as 2:30. Enter them in order. At the bottom, the total time and work days will appear, so please record them.",
        total: "Total Time",
        days: "Work Days",
        footer: "Thank you for your hard work this month. We appreciate you always."
    },
    tl: {
        description: "Pakilagay ang oras ng trabaho. Kapag naglagay ka ng 230, lalabas ito bilang 2:30. Pakilagay ang oras nang sunod-sunod. Sa ibaba ay lalabas ang kabuuang oras at bilang ng araw ng trabaho, pakisulat po ito.",
        total: "Kabuuang Oras",
        days: "Bilang ng Araw",
        footer: "Salamat sa sipag ninyo ngayong buwan. Maraming salamat po lagi."
    },
    vi: {
        description: "Vui lòng nhập giờ làm việc. Nếu nhập 230, hệ thống sẽ hiển thị thành 2:30. Hãy nhập lần lượt. Ở cuối trang sẽ hiển thị tổng giờ và số ngày làm việc, vui lòng ghi lại.",
        total: "Tổng giờ",
        days: "Số ngày làm",
        footer: "Cảm ơn bạn vì sự cố gắng trong tháng này. Luôn luôn biết ơn bạn."
    },
    th: {
        description: "กรุณากรอกชั่วโมงทำงาน หากใส่ 230 ระบบจะแสดงเป็น 2:30 กรุณากรอกตามลำดับ ด้านล่างสุดจะแสดงชั่วโมงรวมและจำนวนวันทำงาน กรุณาบันทึกข้อมูล",
        total: "ชั่วโมงรวม",
        days: "จำนวนวันทำงาน",
        footer: "ขอบคุณสำหรับความพยายามในเดือนนี้ ขอบคุณเสมอค่ะ/ครับ"
    },
    lo: {
        description: "ກະລຸນາໃສ່ເວລາເຮັດວຽກ. ຖ້າໃສ່ 230 ຈະສະແດງເປັນ 2:30. ກະລຸນາໃສ່ຕາມລຳດັບ. ທ້າຍສຸດຈະສະແດງເວລາລວມ ແລະ ຈຳນວນວັນເຮັດວຽກ, ກະລຸນາບັນທຶກ.",
        total: "ເວລາລວມ",
        days: "ຈຳນວນວັນ",
        footer: "ຂອບໃຈສຳລັບຄວາມພະຍາຍາມໃນເດືອນນີ້. ຂອບໃຈເສມເສມ."
    },
    id: {
        description: "Silakan masukkan jam kerja Anda. Jika Anda memasukkan 230, akan tampil sebagai 2:30. Masukkan secara berurutan. Di bagian bawah akan muncul total waktu dan jumlah hari kerja, silakan dicatat.",
        total: "Total Waktu",
        days: "Jumlah Hari",
        footer: "Terima kasih atas kerja keras Anda bulan ini. Kami selalu menghargai Anda."
    },
    zh: {
        description: "请输入您的工作时间。输入230时会显示为2:30。请按顺序输入。页面底部会显示总时间和出勤天数，请填写。",
        total: "总时间",
        days: "出勤天数",
        footer: "本月辛苦了。一直以来非常感谢您。"
    }
};

document.querySelectorAll(".language-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        document.getElementById("description").textContent = translations[lang].description;
        document.getElementById("total-label").textContent = translations[lang].total + "：";
        document.getElementById("days-label").textContent = translations[lang].days + "：";
        document.getElementById("footer-text").textContent = translations[lang].footer;
    });
});
