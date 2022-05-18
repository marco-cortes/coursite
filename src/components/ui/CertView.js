import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { Loading } from "./Loading";

import React from 'react'
import { Cert } from './Cert'
import { startLoadUserCourse } from "../../redux/actions/student";
import { View404 } from "../views/View404";
import { PDFViewer } from "@react-pdf/renderer";

export const CertView = () => {

    const { id } = useParams();
    const { active } = useSelector(state => state.courses);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        if(user)
            dispatch(startLoadUserCourse(id, user.id));
    }, [id, dispatch, user]);

    if (!user)
        return <h2>No autorizado</h2>;

    if (!active) {
        return <Loading />;
    }

    if (active.progress < 100)
        return <View404 />;

    return (
        <PDFViewer style={{
            width: "100vw",
            height: "100vh",
        }}>
            <Cert name={user.name + " " + user.lastName} title={active.title} />
        </PDFViewer>
    )
}
