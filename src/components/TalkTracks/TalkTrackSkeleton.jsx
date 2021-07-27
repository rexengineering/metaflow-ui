import {makeStyles} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles(({spacing}) => ({
    tabs: {
        display: "flex",
        backgroundColor: "whitesmoke",
        padding: spacing(2),
    },
    options:{
        display: "flex",
    },
    content: {
        flexGrow: 2,
    },
    tabSeparator: {
        margin: spacing(0, 3),
        transform: "none"
    },
    contentHeader:{
        display: "flex",
        alignItems: "center",
        marginBottom: spacing(1),
    },
    contentHeaderText: {
        marginLeft: spacing(1),
        flexGrow: 1,
    },
}));

function TalkTrackSkeleton(){
    const classes = useStyles();
    const tabsSeparatorWidth = 3;
    const tabsSeparatorHeight = 200;
    const tabOptionWidth = 100;
    const tabOptionHeight = 50;
    const textHeight = 150;
    const headerCircleSize = 40;

    return (
        <section className={classes.tabs}>
            <section className={classes.options}>
                <div>
                    <Skeleton width={tabOptionWidth} height={tabOptionHeight} />
                    <Skeleton width={tabOptionWidth} height={tabOptionHeight} />
                    <Skeleton width={tabOptionWidth} height={tabOptionHeight} />
                    <Skeleton width={tabOptionWidth} height={tabOptionHeight} />
                </div>
                <Skeleton
                    className={classes.tabSeparator}
                    width={tabsSeparatorWidth}
                    height={tabsSeparatorHeight} />
            </section>
            <section className={classes.content}>
                <div className={classes.contentHeader}>
                    <Skeleton variant="circle" width={headerCircleSize} height={headerCircleSize} />
                    <div className={classes.contentHeaderText}>
                        <Skeleton />
                        <Skeleton />
                    </div>
                </div>
                <Skeleton variant="rect" height={textHeight} />
            </section>
        </section>
    );

}

export default TalkTrackSkeleton;