# Medlemskap Kontroll

Det här projektet tillåter användare att kontrollera medlemskap i en förening genom att ange antingen ett personnummer eller namn via ett enkelt formulär. Projektet använder ett API för att verifiera medlemskap baserat på användarens information.

## Funktioner

- Användare kan ange ett **personnummer** (10 eller 12 siffror) eller **förnamn och efternamn** för att kontrollera medlemskap.
- Validering av personnummer och namn.
- API-anrop till ett externt medlemskaps-API för att verifiera medlemskap.
- Visar status om användaren är medlem eller inte.

## Teknologier

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js (om du väljer att använda en server)
- **API**: Använder ett externt API från [Sverok](https://ebas.sverok.se) för att verifiera medlemskap.

## Installation

För att köra projektet lokalt på din dator, följ stegen nedan:

1. Klona repositoryn till din lokala maskin:
   ```bash
   git clone https://github.com/ditt-användarnamn/sverok-medlem-checker.git
   ```

2. Navigera till projektmappen:
   ```bash
   cd sverok-medlem-checker
   ```

3. Installera nödvändiga paket:
   För att köra projektet med Node.js, behöver du installera de nödvändiga paketen. Om du använder backend, kör:
   ```bash
   npm install
   ```

4. Starta servern:
   Om du använder Node.js-servern kan du starta den med:
   ```bash
   npm start
   ```

   Om du bara använder frontend (HTML, CSS, JS) kan du öppna **index.html** i en webbläsare.

## Användning

1. Gå till sidan där användaren kan skriva in sitt **personnummer** eller **namn**.
2. Skriv in informationen i det relevanta fältet.
3. Klicka på **Kontrollera**.
4. Få status om du är medlem eller inte baserat på API:s svar.

## Validering

- **Personnummer**: 10 eller 12 siffror (YYYYMMDDXXXX eller YYMMDDXXXXXX).
- **Namn**: Förnamn och efternamn (t.ex., "Anna Svensson").

## API

Projektet använder följande API för att kontrollera medlemskap:

### API URL
- `POST https://ebas.sverok.se/apis/confirm_membership.json`

### API Request Body
```json
{
  "request": {
    "action": "confirm_membership",
    "association_number": "Ert F-nummer",
    "api_key": "Er API-nyckel",
    "year_id": YYYY,
    "firstname": "",
    "lastname": "",
    "socialsecuritynumber": "YYYYMMDDXXXX",
    "email": "",
    "phone1": "",
    "member_nick": null,
    "discord_user_id": null
  }
}
```

### API Response
```json
{
  "response": {
    "member_found": true | false
  },
  "request_echo": {
    "action": "confirm_membership",
    "association_number": "Ert F-nummer",
    "api_key": "Er API-nyckel",
    "year_id": YYYY,
    "firstname": "",
    "lastname": "",
    "socialsecuritynumber": "YYYYMMDDXXXX",
    "email": "",
    "phone1": "",
    "member_nick": null,
    "discord_user_id": null
  }
}
```

## Förbättringar

- Implementera bättre felhantering vid API-anrop.
- Stöd för fler typer av identifiering (t.ex. e-postadress).
- Möjlighet att integrera med fler medlemskapssystem.

## Licens

Detta projekt är licensierat under MIT-licensen - se [LICENSE](LICENSE) för mer information.
