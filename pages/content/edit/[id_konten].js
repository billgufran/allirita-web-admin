import { useRouter } from "next/router";
import DetailViewLayout from '../../../components/DetailViewLayout';

//path: /content/edit/[id]

export default function Edit() {

	//get the id from query
	const router = useRouter();
	const {id_konten} = router.query;
	console.log(router)

	return <DetailViewLayout id_konten={id_konten} />
}