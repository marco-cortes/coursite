import { Document, Page, Image, Text, View } from "@react-pdf/renderer";

import medal from "../../image/medal.png";
import signature from "../../image/signature.png";
import logo from "../../image/csTeam.png";

export const Cert = ({ name, title }) => {

  return (
    <Document size="A4">
      <Page orientation="landscape">
        <View style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: "#112240"
        }}>
          <View style={{
            textAlign: "center"
          }}>
            <Text style={{
              fontSize: "40px",
              color: "#a5a6f6",
              alignSelf: "start",
              marginTop: "32px",
              fontWeight: "500",
              textAlign: "center",
            }}>
              Certificado de Finalización
            </Text>

            <Text style={{
              fontSize: "21px",
              color: "#6c63ff",
              marginTop: "60px",
              fontWeight: "500",
            }}>
              ESTE CERTIFICADO ES ENTREGADO A
            </Text>
            <Text style={{
              fontSize: "40px",
              color: "#a5a6f6",
              marginTop: "16px",
              fontWeight: "700",
            }}>
              {name}
            </Text>
            <Text style={{
              fontSize: "21px",
              color: "#6c63ff",
              marginTop: "60px",
              fontWeight: "500",
              textTransform: "uppercase",
            }}>
              Por la finalización del curso llamado:
            </Text>
            <Text style={{ color: "#a5a6f6", fontSize: "21px", marginTop: "21px" }}>"{title}"</Text>

            <View style={{
              display: "flex",
              flexDirection: "row",
              margin: "32px 32px",
              marginTop: "48px"
            }}>
              <Image style={{
                width: "160px",
                height: "auto",
              }} src={medal} alt="medal" />

              <View style={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
              }}>
                <Text style={{
                  fontSize: "23px",
                  color: "#6c63ff",
                  textAlign: "center",
                }}>Firma</Text>
                <Image style={{
                  maxWidth: "200px",
                  textAlign: "center",
                  margin: "0 auto",
                }} src={signature} alt="signature" />
                <Text style={{
                  fontSize: "20px",
                  color: "white",
                  fontWeight: "300",
                  textAlign: "center",
                }}>Samira Hadid</Text>
                <Text style={{
                  fontSize: "23px",
                  color: "#6c63ff",
                  marginTop: "16px",
                }}>Director</Text>
              </View>

              <Image style={{
                width: "160px",
                height: "auto",
              }} src={logo} alt="medal" />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
