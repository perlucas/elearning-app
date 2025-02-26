type Params = {
  params: {
    name: string;
  };
};

export default function DevPage({ params }: Params) {
  return <h1>Hi! {params.name}</h1>;
}
