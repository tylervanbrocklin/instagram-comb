import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import JSZip from 'jszip';
import Promise from 'bluebird';

class InstaProcessor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: undefined,
            file: undefined,
            images: []
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
        return await zip.files[path].async("base64");
    };

    handleFile = async () => {
        const file = document.getElementById('inputInstaData').files[0];
        const newZip = new JSZip();
        await newZip.loadAsync(file)
            .then(async(zip) => {
                const media = JSON.parse(await zip.files["media.json"].async("string")).photos;
                return Promise.map(media, async (photo) => {
                    return {
                        caption: photo.caption,
                        date: photo.taken_at,
                        img: await this.locateImage(zip, photo.path),
                        location: photo.location ? photo.location : undefined
                    };
                });
            })
            .then((images) => {
                this.setState({
                    images
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const images = this.state.images.map(item => {
                return <img src={"data:image/png;base64," + item.img} height="100" width="100"/>;
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
