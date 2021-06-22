import React, { Fragment } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import { useParams, useRouteMatch, Switch, Route } from "react-router-dom";

const Brand = () => {
	const { brand } = useParams();
	return (
		<Fragment>
			<h1>{brand}</h1>
		</Fragment>
	);
};

export default Brand;
