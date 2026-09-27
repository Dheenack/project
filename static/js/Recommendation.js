function recommendProperty() {

    let budget = parseFloat(document.getElementById("budget").value);
    let city = document.getElementById("city").value;
    let type = document.getElementById("type").value;
    let bhk = document.getElementById("bhk").value;

    if (isNaN(budget)) {
        alert("Please enter your budget.");
        return;
    }

    let recommendation = "";

    if (city === "Pondicherry") {

        if (budget >= 10000000) {
            recommendation =
                "🏡 Luxury " + bhk + " " + type +
                "<br>Location: White Town, Pondicherry";
        }
        else if (budget >= 7000000) {
            recommendation =
                "🏠 Premium " + bhk + " " + type +
                "<br>Location: Lawspet, Pondicherry";
        }
        else if (budget >= 5000000) {
            recommendation =
                "🏘 Affordable " + bhk + " " + type +
                "<br>Location: Muthialpet, Pondicherry";
        }
        else {
            recommendation =
                "🏠 Budget Home " + bhk + " " + type +
                "<br>Location: Ariyankuppam, Pondicherry";
        }

    } else {

        if (budget >= 8000000) {
            recommendation =
                "🏡 Luxury " + bhk + " " + type +
                "<br>Location: Cuddalore OT";
        }
        else if (budget >= 6000000) {
            recommendation =
                "🏠 Premium " + bhk + " " + type +
                "<br>Location: Manjakuppam";
        }
        else if (budget >= 4000000) {
            recommendation =
                "🏘 Affordable " + bhk + " " + type +
                "<br>Location: Thiruppapuliyur";
        }
        else {
            recommendation =
                "🏠 Budget Home " + bhk + " " + type +
                "<br>Location: Kurinjipadi";
        }

    }

    document.getElementById("recommendationResult").innerHTML = recommendation;

}