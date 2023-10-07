import Cards from '@/components/Home/Cards';
import HomeHero from '@/components/Home/HomeHero';
import Menu from '@/components/Menu';
import {BaseQueryDocument} from '@/gql/graphql';
import {getClient} from '@/lib/apollo/ApolloClient';


async function getData() {
    const {data} = await getClient().query({
        query: BaseQueryDocument,
        variables: {
            "locale": "en",
            "filters": {
                "slug": {
                    "eq": "home"
                }
            }
        }
    });

    return data;
}

export default async function Home() {
    const {menu} = await getData();

    return (
        <>
            <Menu menu={menu}/>
            <HomeHero
                descriptions={[
                    'I develop.',
                    'I tinker.',
                    'I talk.',
                    'I\'m Johannes Spijkerman.',
                    'And I\'m a web-developer with too many hobbies.'
                ]}
            />
            <Cards/>
        </>
    )
}
