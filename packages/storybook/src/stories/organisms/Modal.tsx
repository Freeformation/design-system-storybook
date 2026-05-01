import { Modal } from '@freeformation/core';

export default function StoryModal(props: any) {
  return <Modal {...props}>{props.children}</Modal>;
}

