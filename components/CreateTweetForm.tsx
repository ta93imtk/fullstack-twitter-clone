import { useState } from "react";
import { mutate } from "swr";

import { fetcher } from "./util/fetcher";
import { useFeed, useMe } from "./util/hooks";
import { Button, message, Row, Col, Input } from "antd";

export const CreateTweetForm = () => {
    const [input, setInput] = useState("");
    const { feed } = useFeed();
    const { me } = useMe();

    return (
        <form
            style={{ padding: "2rem" }}
            onSubmit={async (e) => {
                e.preventDefault();
                // we include "false" here to ask SWR not to revalidate the cache with
                // the feed returned from the server. we'll remove this after the next section
                if (input.length < 1) {
                    message.error("Oops! You can't create empty tweets.");
                    return;
                }
                if (!me || !me.username) {
                    message.error("You must be logged in to tweet.");
                    return;
                }
                mutate(
                    "/api/feed",
                    [{ text: input, author: me }, ...feed],
                    false
                );

                fetcher("/api/tweet/create", {
                    text: input,
                });

                setInput("");
            }}
        >
            <Row>
                <Col>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button htmlType="submit">Tweet</Button>
                </Col>
            </Row>
        </form>
    );
};
