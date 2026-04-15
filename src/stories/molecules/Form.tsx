import Form from '../../components/molecules/Form';

export default function StoryForm(props: any) {
  return <Form {...props}>{props.children}</Form>;
}
