import { IProperty } from "../../types/types";

interface IDescriptionTab {
    property: IProperty;
}

const DescriptionTab = ({ property }: IDescriptionTab) => {
    return (
        <section style={{ whiteSpace: `pre-wrap` }}>
            {property.description}
        </section>
    );
};

export default DescriptionTab;
