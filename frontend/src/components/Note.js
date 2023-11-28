import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

const Note = (props) => {
  return (
    <Card m="1%">
      <CardBody>
        <Heading size="md" paddingBottom={"1%"}>
          {props.title}
        </Heading>
        <Text fontSize="md">{props.content}</Text>
      </CardBody>
    </Card>
  );
};

export default Note;
