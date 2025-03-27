import BorderedComponent from "../../src/app/components/BorderedComponent/BorderedComponent";

const withBorder = (WrappedComponent) => {
    return (props) => (
        <BorderedComponent>
            <WrappedComponent {...props} />
        </BorderedComponent>
    );
};

export default withBorder;
