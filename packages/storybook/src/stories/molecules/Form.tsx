import { Form } from '@freeformation/core';

export default function StoryForm(props: any) {
  return <Form {...props}>{props.children}</Form>;
}

