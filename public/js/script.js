document
    .getElementById("membership-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const identifier = document.getElementById("identifier").value.trim();
        
        let requestBody = {
            action: "confirm_membership",
            firstname: "",
            lastname: "",
            socialsecuritynumber: "",
            email: "",
            phone1: "",
            member_nick: null,
            discord_user_id: null,
        };

        // Kontrollera om identifier är ett 10- eller 12-siffrigt nummer
        if (/^\d+$/.test(identifier)) {
            // Kontrollera om det bara är siffror
            if (identifier.length === 10 || identifier.length === 12) {
                // Om det är 10 eller 12 siffror, det är ett personnummer
                requestBody.socialsecuritynumber = identifier;
            } else {
                document.getElementById("status-text").innerText =
                    "Ogiltigt personnr! Det ska vara 10 eller 12 siffror.";
                return;
            }
        } else {
            // Om det inte är ett nummer, försök att dela upp det som namn
            const nameParts = identifier.split(" ");
            if (nameParts.length === 2) {
                requestBody.firstname = nameParts[0];
                requestBody.lastname = nameParts[1];
            } else {
                document.getElementById("status-text").innerText =
                    "Ogiltigt namnformat! Ange både förnamn och efternamn.";
                return;
            }
        }

        // Om inget av ovanstående är giltigt (varken namn eller personnummer)
        if (
            !requestBody.socialsecuritynumber &&
            (!requestBody.firstname || !requestBody.lastname)
        ) {
            document.getElementById("status-text").innerText =
                "Ogiltig inmatning! Ange ett giltigt personnummer eller namn.";
            return;
        }

        try {
            // Skicka POST-förfrågan till servern
            const response = await fetch("/api/confirm_membership", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ request: requestBody }),
            });

            const data = await response.json();
            const resultText = data.response.member_found
                ? "Du är medlem!"
                : "Du är inte medlem.";
            document.getElementById("status-text").innerText = resultText;
            document.body.style.backgroundColor = data.response.member_found
                ? "green"
                : "red";
        } catch (error) {
            document.getElementById("status-text").innerText =
                "Ett fel inträffade vid förfrågningen.";
            document.body.style.backgroundColor = "red";
        }
    });