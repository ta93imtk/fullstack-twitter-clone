import { Col, Row } from "antd";
import { Feed } from "../components/Feed";
import { CreateTweetForm } from "../components/CreateTweetForm";
import { Profile } from "../components/Profile";

export default () => (
    <Row>
        <Col md={{ span: 10, offset: 8 }}>
            <Profile />
            <CreateTweetForm />
            <Feed />
        </Col>
    </Row>
);
