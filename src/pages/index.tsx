import { ApolloProvider } from "@apollo/client";
import client from "graphql/apollo-client";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { useEffect } from "react";

const AnimeList = dynamic(() => import("container/anime-list"), {
  ssr: false,
});

export default function Home() {

  const router = useRouter();
  const { asPath } = router;

  const clientId = process.env.ANILIST_CLIENT_ID;
  const redirect = process.env.ANILIST_REDIRECT;
  const secret = process.env.ANILIST_SECRET;
  const code = 'def50200724a9f6b34707d40e61e1357531e0f67315a155271556c2274dc1055011c27028be3d56128be7ed368dabb5f9d98417b0d521adf2176c76d8f5a9a9d258a1ae1732c69302c0ce4bb6e015c95927de43757f9a1aab7ea66f715d09ce9ddd253535ebfe8cc82b35b7755bd48fb1b63b23706f5406ad2e3933df1d1d529a2eec369ec8b190b8c3c92fcad3a46e9a42c1f0703962f564aee84c4bd7f44b63165c424a43eb702ebfcfbe3d957bff999465be126be799d8040d2fa106156538d9405a2b1b01c8b56dde292b3d7aa165076cbabf517351bf84d28e7ca9ba1b5e1afc02a434a39ab74216a2404b3310088de088b20105506c3398433e43a7294c1150064b5dbfaefe07ee69cc36852a269a387cf89931e6c31c089d6175ae80b6e2630e5bff751514a55eac205540818fab1ad5f4198c95112e567c2188d997ea0de6f7a8a462186d19863156d2d9e10291f9d266f10d2a13b36820868c2de60431c5f'

  console.log('clientId', clientId)
 

  useEffect(() => {


    
  }, [clientId, redirect, secret, code])

  
  return (
    <>
      <div className="anime-page"> 
        <div className="anime-content">
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h1 className="anime-title-page">ANIME WORLD</h1>
            {/* <a href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&response_type=code`}>Login with AniList</a> */}
            <a href={`https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`}>Login with AniList</a>
          </div>
          <ApolloProvider client={client}>
            <AnimeList />
          </ApolloProvider>
        </div>
      </div>
      <style jsx>
        {`
          .anime-page {
            min-width: 100vw;
            width: max-content;
            height: 100vh;
            display: flex;
            background-color: #faf9f2;
          }
          .anime-content {
            margin: 50px auto;
            max-width: 1200px;
            font-family: 'Nunito', sans-serif;
          }
          .anime-title-page {
            margin: 0 0 30px; 
            letter-spacing: 0.08rem;
          }
        `}
      </style>
    </>
  )
}

export async function getServerSideProps (context: any) {
  const clientId = process.env.ANILIST_CLIENT_ID;
  const redirect = process.env.ANILIST_REDIRECT;
  const secret = process.env.ANILIST_SECRET;


  // const dataToken = await Axios({
  //   url: 'https://anilist.co/api/v2/oauth/token',
  //   method: "POST",
  //   data: JSON.stringify({
  //     'grant_type': 'authorization_code',
  //     'client_id': clientId,
  //     'client_secret': secret,
  //     'redirect_uri': redirect,
  //     'code': context.query.code,
  //   })
  // }).then((res) => { console.log('cheeek', res) })

  // console.log('dataToken', dataToken)
  
  // const dataToken = async () => {
  //   await Axios({
  //     url: 'https://anilist.co/api/v2/oauth/token',
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //     data: {
  //       'grant_type': 'authorization_code',
  //       'client_id': clientId,
  //       'client_secret': secret,
  //       'redirect_uri': redirect,
  //       'code': context.query.code
  //     }
  //   }).then((res) => { console.log('cheeek', res) }).catch((err) => { console.log(err)})
  // }

  // dataToken();

  return {
    props: {
      
    },
  };
};


