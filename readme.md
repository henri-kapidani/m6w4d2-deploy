# Deploy on the cloud

-   **_In genere NON usate indirizzi statici nei vostri progetti ma fate uso delle variabili di ambiente_** (che durante lo sviluppo di solito vengono scritte nel file `.env`, mentre in produzione potranno essere inserite anche in altre maniere).

## Backend (su [Render](https://render.com/))

-   assicurarsi di non avere nel codice link a localhost ma sostituirli con variabili d'ambiente:

    "http://localhost:3000/login" ---> `${process.env.FRONTEND_URL}/login`

    "http://localhost:5000/api/v1/google-callback" ---> `${process.env.FRONTEND_URL}/api/v1/google-callback`

-   aggiungere nel file `.env` e `.env.exaple` la chiave FRONTEND_URL

-   durante il deploy sistemare i valori delle chiavi nel file `.env` e inserirli direttamente nell'interfaccia del servizio del deploy (HOST, PORT, FRONTEND_URL)

## Frontend (su [Vercel](https://vercel.com/) o [Netlify](https://www.netlify.com/))

-   assicurarsi di non avere nel codice link a localhost ma sostituirli con variabili d'ambiente
    "http://localhost:5000/api/v1/posts" ---> `${process.env.REACT_APP_API_URL}/api/v1/posts`

-   aggiungere nel file `.env.local` e `.env.exaple` la chiave `REACT_APP_API_URL`

-   durante il deploy sistemare i valori delle chiavi nel file `.env.local` e inserirli direttamente nell'interfaccia del servizio del deploy (`REACT_APP_API_URL` e inserire anche `CI` con valore `false` altrimenti anche warning fanno fallire il deploy perchè verranno considerati errori)

## Sistemare la configurazione dell'applicazione su Google (se implementa OAuth)

-   Aggiungere alla lista di `Authorized redirect URIs` su [Google](https://console.cloud.google.com/apis/credentials) l'indirizzo del backend fornito da Render
