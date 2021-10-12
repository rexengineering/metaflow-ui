import React from "react";
import { render } from "@testing-library/react";
import TalkTracks from "./TalkTracks";
import mockData from "./mockData";
import {Provider} from "react-redux";
import getStore from "../../store";

describe("<TalkTrack />", () => {

  const defaultProps = {
    activeTalkTrackID: "buying-123",
    talkTrackItems: mockData,
    isATalkTrackBeingFetched: false,
  };

  const renderTalkTrackComponent = ({ activeTalkTrackID, talkTrackItems, isATalkTrackBeingFetched} = defaultProps) => (
      <Provider store={getStore({})}>
        <TalkTracks
            isATalkTrackBeingFetched={isATalkTrackBeingFetched}
            talkTracks={talkTrackItems}
            activeTalkTrackID={activeTalkTrackID}
        />
      </Provider>
  );

  it("should render", () => {
    const { asFragment } = render(renderTalkTrackComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

});
