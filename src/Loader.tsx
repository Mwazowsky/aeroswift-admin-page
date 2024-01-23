import { ComponentType, Suspense } from "react";
import SuspenseLoader from "src/components/SuspenseLoader";

type Props = Record<string, unknown>;
type ComponentWithProps = ComponentType<Props>;

const Loader = (Component: ComponentWithProps) => (props: Props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

export default Loader;