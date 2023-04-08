import { CardProps } from "./Card.types";
import InvitationCard from "./InvitationCard";
import TagCard from "./TagCard";
import TaskCard from "./TaskCard";
import UserCard from "./UserCard";

function Card({ type, element }: CardProps) {
  switch (type) {
    case "task":
      return <TaskCard element={element} />;
    case "invitation":
      return <InvitationCard />;
    case "tag":
      return <TagCard />;
    case "user":
      return <UserCard />;
    default:
      return null;
  }
}

export default Card;
