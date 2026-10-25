let passengers = [
    { pnrCode: "VN001", passengerName: "Nguyen Van An", idNumber: "012345678901", flightNumber: "VN123", seatNumber: "", isCheckedIn: false },
    { pnrCode: "VN002", passengerName: "Tran Thi Mai", idNumber: "B12345678", flightNumber: "VN123", seatNumber: "", isCheckedIn: false }
];

const availableSeats = ["12A", "12B", "14C"];

function validateIdNumber(idNumber) {
    return /^\d{12}$/.test(idNumber) || /^[A-Za-z]\d{7,8}$/.test(idNumber);
}

function findPassenger(pnrCode) {
    for (let i = 0; i < passengers.length; i++) {
        if (passengers[i].pnrCode === pnrCode) {
            return passengers[i];
        }
    }
    return null;
}

function assignSeat(flightNumber) {
    for (let i = 0; i < availableSeats.length; i++) {
        let seat = availableSeats[i];
        let isTaken = false;

        for (let j = 0; j < passengers.length; j++) {
            if (
                passengers[j].flightNumber === flightNumber &&
                passengers[j].seatNumber === seat
            ) {
                isTaken = true;
                break;
            }
        }

        if (!isTaken) {
            return seat;
        }
    }

    return null;
}

function addPassenger() {
    let pnrCode = prompt("Nhap ma PNR: ").trim().toUpperCase();

    if (!pnrCode || findPassenger(pnrCode) !== null) {
        console.log("Ma PNR khong hop le hoac da ton tai!");
        return;
    }

    let passengerName = prompt("Nhap ho ten: ").trim();
    let idNumber = prompt("Nhap CCCD/Hộ chieu: ").trim();
    let flightNumber = prompt("Nhap so hieu chuyen bay: ").trim().toUpperCase();

    if (!passengerName || !flightNumber) {
        console.log("Ho ten va chuyen bay khong duoc de trong!");
        return;
    }

    if (!validateIdNumber(idNumber)) {
        console.log("CCCD/Hộ chieu khong hop le!");
        return;
    }

    passengers.push({
        pnrCode,
        passengerName,
        idNumber,
        flightNumber,
        seatNumber: "",
        isCheckedIn: false
    });

    console.log("Them ho so thanh cong!");
}

function checkIn() {
    let pnrCode = prompt("Nhap ma PNR: ").trim().toUpperCase();
    let passenger = findPassenger(pnrCode);

    if (passenger === null) {
        console.log("Khong tim thay ho so!");
        return;
    }

    if (!validateIdNumber(passenger.idNumber)) {
        console.log("Giay to khong hop le!");
        return;
    }

    if (passenger.isCheckedIn) {
        console.log("Hanh khach da check-in!");
        return;
    }
    let seat = assignSeat(passenger.flightNumber);
    if (seat === null) {
        console.log("Chuyen bay da het ghe!");
        return;
    }
    passenger.seatNumber = seat;
    passenger.isCheckedIn = true;
    console.log("Xac thuc giay to: HOP LE");
    console.log("Xac thuc chuyen bay:", passenger.flightNumber);
    displayBoardingPass(passenger);
}

function displayBoardingPass(passenger) {
    console.log("========================================");
    console.log("             BOARDING PASS");
    console.log("========================================");
    console.log("Passenger : " + passenger.passengerName);
    console.log("PNR       : " + passenger.pnrCode);
    console.log("Flight    : " + passenger.flightNumber);
    console.log("Seat      : " + passenger.seatNumber);
    console.log("ID        : " + passenger.idNumber);
    console.log("Status    : CHECKED IN");
    console.log("Barcode   : ||||| || ||||| || ||||");
    console.log("========================================");
}

function listPassengers() {
    console.table(passengers);
}

function main() {
    let choice;

    do {
        console.log("\n===== AIRPORT CHECK-IN =====");
        console.log("1. Them ho so hanh khach");
        console.log("2. Check-in va in Boarding Pass");
        console.log("3. Xem danh sach hanh khach");
        console.log("4. Thoat");

        choice = Number(prompt("Chon chuc nang: "));

        switch (choice) {
            case 1:
                addPassenger();
                break;
            case 2:
                checkIn();
                break;
            case 3:
                listPassengers();
                break;
            case 4:
                console.log("Da thoat chuong trinh!");
                break;
            default:
                console.log("Lua chon khong hop le!");
        }
    } while (choice !== 4);
}
main();