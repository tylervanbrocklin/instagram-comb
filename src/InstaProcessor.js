import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import JSZip from 'jszip';

class InstaProcessor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: undefined,
            file: undefined,
            images: undefined
        }

        this.locateImage = this.locateImage.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    processImages = async(photos, file) => {
        const imgs = await photos.map(async(item) => {
            return await file[item].async("base64")
                .then((imgData) => {
                        return imgData
                    }
                );
        });
        return await imgs;
    };

    locateImage = async(zip, path) => {
        const photoH = await zip.files[path].async("base64").then((data) => {
            return data;
        });
        return photoH;
    };

    handleFile = () => {
        let file = document.getElementById('inputInstaData').files[0];
        let newZip = new JSZip();
        newZip.loadAsync(file)
            .then(async(zip) => {
                const media = JSON.parse(await zip.files["media.json"].async("string").then(async(data) => await data)).photos;
                let imageCaptions = await media.map(async(photo) => {
                    return {
                        caption: photo.caption,
                        date: photo.taken_at,
                        img: this.locateImage(zip, photo.path),
                        location: photo.location ? photo.location : undefined
                    };
                });
                console.log(imageCaptions);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const images = this.state.images === undefined ? "" :
            this.state.images.map(item => {
                console.log(this.locateImage(item.img));
                return <img src={"data:image/png;base64," + this.locateImage(item.img)} height="100" width="100"/>;
            });

        return (
            <Container>
                <Row className="pb-2">
                    <Col></Col>
                    <Col md={8}>
                        <div className="input-group">
                            <div className="custom-file">
                                <input onChange={this.handleFile}
                                       type="file"
                                       className="custom-file-input"
                                       id="inputInstaData"/>
                                <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                            </div>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col md={8}>
                        <Button variant="primary">
                            Start Processing
                        </Button>
                        {images}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

export default InstaProcessor;