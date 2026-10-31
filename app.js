let athletes = [
    {
        athleteCode: "ATH-001",
        fullName: "Lâm Văn Hải",
        sport: "Bóng Đá",
        age: 21,
        jerseyNumber: 10
    },
    {
        athleteCode: "ATH-002",
        fullName: "Tạ Minh Thư",
        sport: "Bóng Chuyền",
        age: 19,
        jerseyNumber: 7
    },
    {
        athleteCode: "ATH-003",
        fullName: "Đinh Công Phát",
        sport: "Bóng Đá",
        age: 24,
        jerseyNumber: 9
    }
];

function validateAthleteCode(code) {
    if (code === null || code.trim() === "") {
        return "Chưa nhập mã vận động viên";
    }

    code = code.trim().toUpperCase();

    if (code.length < 6) {
        return "Độ dài nhỏ hơn 6 ký tự";
    }

    if (!code.startsWith("ATH-")) {
        return 'Sai tiền tố "ATH-"';
    }

    if (/\s/.test(code)) {
        return "Chứa khoảng trắng";
    }

    if (findAthleteIndex(code) !== -1) {
        return "Mã vận động viên đã tồn tại";
    }

    return "";
}

function findAthleteIndex(code) {
    for (let i = 0; i < athletes.length; i++) {
        if (athletes[i].athleteCode === code) {
            return i;
        }
    }

    return -1;
}

function normalizeText(rawText) {
    let text = rawText.trim().replace(/\s+/g, " ");
    let words = text.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(" ");
}

function inputIntegerInRange(message, min, max) {
    while (true) {
        let input = prompt(message);

        if (input === null) {
            return null;
        }

        input = input.trim();

        if (input === "") {
            console.log("Lỗi: Chưa nhập, nhập lại");
            continue;
        }

        if (!/^-?\d+$/.test(input)) {
            console.log("Lỗi: Không phải số nguyên, nhập lại");
            continue;
        }

        let number = Number(input);

        if (number < min || number > max) {
            console.log("Lỗi: Ngoài phạm vi " + min + " - " + max + ", nhập lại");
            continue;
        }

        return number;
    }
}

function displayAthletes(list) {
    if (list.length === 0) {
        console.log("Danh sách vận động viên trống");
        return;
    }

    for (let i = 0; i < list.length; i++) {
        console.log(
            (i + 1) + ". " +
            list[i].athleteCode + " - " +
            list[i].fullName + " - " +
            list[i].sport
        );

        console.log(
            "Tuổi: " + list[i].age +
            " | Số áo: " + list[i].jerseyNumber
        );
    }

    console.log("Tổng: " + list.length + " vận động viên");
}

function showAthletes() {
    if (athletes.length === 0) {
        console.log("Danh sách vận động viên trống");
        return;
    }

    let choice = prompt(
        "Chọn cách hiển thị:\n" +
        "1. Theo thứ tự hiện tại\n" +
        "2. Sắp xếp theo tuổi tăng dần"
    );

    if (choice === null) {
        console.log("Đã hủy thao tác hiển thị");
        return;
    }

    let list = athletes;

    if (choice.trim() === "2") {
        list = athletes.slice().sort(function(a, b) {
            return a.age - b.age;
        });
    }

    displayAthletes(list);
}

function addAthlete() {
    let code = prompt("Nhập mã vận động viên:");

    if (code === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    code = code.trim().toUpperCase();

    let error = validateAthleteCode(code);

    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }

    let name;

    while (true) {
        name = prompt("Nhập họ tên:");

        if (name === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        name = normalizeText(name);

        if (name === "") {
            console.log("Lỗi: Họ tên không được để trống");
            continue;
        }

        break;
    }

    let sport;

    while (true) {
        sport = prompt("Nhập môn thi đấu:");

        if (sport === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        sport = normalizeText(sport);

        if (sport === "") {
            console.log("Lỗi: Môn thi đấu không được để trống");
            continue;
        }

        break;
    }

    let age = inputIntegerInRange("Nhập tuổi (15 - 40):", 15, 40);

    if (age === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let jerseyNumber = inputIntegerInRange("Nhập số áo (1 - 99):", 1, 99);

    if (jerseyNumber === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let newAthlete = {
        athleteCode: code,
        fullName: name,
        sport: sport,
        age: age,
        jerseyNumber: jerseyNumber
    };

    athletes.push(newAthlete);

    console.log("Thêm vận động viên thành công!");
    displayAthletes([newAthlete]);
}

function updateAthlete() {
    let code = prompt("Nhập mã vận động viên cần cập nhật:");

    if (code === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    code = code.trim().toUpperCase();

    let index = findAthleteIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy vận động viên có mã " + code);
        return;
    }

    let oldAge = athletes[index].age;
    let oldJersey = athletes[index].jerseyNumber;

    console.log("Thông tin trước khi cập nhật:");
    console.log("Tuổi: " + oldAge + " | Số áo: " + oldJersey);

    let newAge = inputIntegerInRange("Nhập tuổi mới (15 - 40):", 15, 40);

    if (newAge === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let newJersey = inputIntegerInRange("Nhập số áo mới (1 - 99):", 1, 99);

    if (newJersey === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    athletes[index].age = newAge;
    athletes[index].jerseyNumber = newJersey;

    console.log("Cập nhật thành công!");
    console.log("Trước: " + oldAge + " / " + oldJersey);
    console.log("Sau: " + newAge + " / " + newJersey);
}

function deleteAthlete() {
    let code = prompt("Nhập mã vận động viên cần xóa:");

    if (code === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    code = code.trim().toUpperCase();

    let index = findAthleteIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy vận động viên có mã " + code);
        return;
    }

    let confirmDelete = prompt("Bạn có chắc chắn muốn xóa? (Y/N)");

    if (confirmDelete === null ||
        (confirmDelete.trim().toUpperCase() !== "Y" &&
         confirmDelete.trim().toUpperCase() !== "N")) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    if (confirmDelete.trim().toUpperCase() === "N") {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    athletes.splice(index, 1);

    console.log("Xóa thành công!");
    displayAthletes(athletes);
}

function searchAthlete() {
    let keyword = prompt("Nhập từ khóa tìm kiếm:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = [];

    for (let i = 0; i < athletes.length; i++) {
        if (athletes[i].sport.toLowerCase().includes(keyword)) {
            result.push(athletes[i]);
        }
    }

    if (result.length === 0) {
        console.log("Không tìm thấy vận động viên phù hợp");
    } else {
        console.log("Tìm thấy " + result.length + " vận động viên:");
        displayAthletes(result);
    }
}

function reportAthletes() {
    if (athletes.length === 0) {
        console.log("Chưa có vận động viên nào");
        return;
    }

    let totalAge = 0;
    let oldest = athletes[0];

    for (let i = 0; i < athletes.length; i++) {
        totalAge += athletes[i].age;

        if (athletes[i].age > oldest.age) {
            oldest = athletes[i];
        }
    }

    let averageAge = (totalAge / athletes.length).toFixed(1);

    console.log("======================================");
    console.log("BÁO CÁO TỔNG KẾT VẬN ĐỘNG VIÊN");
    console.log("======================================");
    console.log("Tổng số vận động viên: " + athletes.length);
    console.log("Tuổi trung bình: " + averageAge);

    console.log(
        "Vận động viên lớn tuổi nhất: " +
        oldest.athleteCode + " - " +
        oldest.fullName + " - " +
        oldest.age
    );

    console.log("======================================");
}

function exitProgram() {
    console.log("Cảm ơn bạn đã sử dụng chương trình!");
    reportAthletes();
}

function menu() {
    while (true) {
        let choice = prompt(
            "========================================\n" +
            "HỆ THỐNG QUẢN LÝ VẬN ĐỘNG VIÊN CLB THỂ THAO VICTORY\n" +
            "========================================\n" +
            "1. Hiển thị danh sách vận động viên\n" +
            "2. Thêm vận động viên mới\n" +
            "3. Cập nhật thông tin vận động viên\n" +
            "4. Xóa vận động viên\n" +
            "5. Tìm kiếm vận động viên theo môn thi đấu\n" +
            "0. Thoát chương trình\n" +
            "========================================\n" +
            "Vui lòng nhập lựa chọn của bạn (0 - 5):"
        );

        if (choice === null) {
            console.log("Lựa chọn không hợp lệ! Vui lòng nhập từ 0 đến 5.");
            continue;
        }

        choice = choice.trim();

        if (!/^[0-5]$/.test(choice)) {
            console.log("Lựa chọn không hợp lệ! Vui lòng nhập từ 0 đến 5.");
            continue;
        }

        switch (choice) {
            case "1":
                showAthletes();
                break;

            case "2":
                addAthlete();
                break;

            case "3":
                updateAthlete();
                break;

            case "4":
                deleteAthlete();
                break;

            case "5":
                searchAthlete();
                break;

            case "0":
                exitProgram();
                return;
        }
    }
}

menu();