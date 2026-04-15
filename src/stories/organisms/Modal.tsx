import Modal from '../../components/organisms/Modal';

export default function StoryModal(props: any) {
  return <Modal {...props}>{props.children}</Modal>;
}
