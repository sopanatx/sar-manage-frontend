import Link from "next/link";
import { useRouter } from "next/router";
const { query } = useRouter();
export default ({
  url: {
    query: { name },
  },
}) => <p>Welcome to About! {name}</p>;
