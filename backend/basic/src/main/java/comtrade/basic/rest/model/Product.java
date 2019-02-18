package comtrade.basic.rest.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Document(collection = "products")
public class Product {
    private static final long serialVersionUID = 1L;

    @Id
    private ObjectId id;

    private String name;
    private String image;
    private String thumbnail;

    public String getId() {
        return id.toHexString();
    }
    public void setId(ObjectId id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @JsonIgnore
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public String getThumbnail() {
        return thumbnail;
    }
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

}
