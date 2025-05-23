import BorderedComponent from "@/components/ui/BorderedComponent/BorderedComponent";

const withBorder = (WrappedComponent) => {
    return (props) => (
        <BorderedComponent>
            <WrappedComponent {...props} />
        </BorderedComponent>
    );
};

export default withBorder;
