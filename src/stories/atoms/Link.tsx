import Link from '../../components/atoms/Link';

export default function StoryLink(props: any) {
  return <Link {...props}>{props.children}</Link>;
}
