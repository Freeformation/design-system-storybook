import { Link } from '@freeformation/core';

export default function StoryLink(props: any) {
  return <Link {...props}>{props.children}</Link>;
}

