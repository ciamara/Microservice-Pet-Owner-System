package labs.aui;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import jakarta.persistence.*;
import labs.aui.enums.Animal;
import labs.aui.enums.Gender;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.GenericGenerator;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ToString(exclude = {"simpleOwner"})
@EqualsAndHashCode(exclude = {"simpleOwner"})
@Entity
@Table(name = "pets")
public class Pet implements Comparable<Pet>, Serializable {
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "UUID")
    @Id
    @Column(name = "pet_id", nullable = false)
    private UUID petId;
    @Column(name = "name")
    private String name;
    @Enumerated(EnumType.STRING)
    @Column(name = "animal")
    private Animal animal;
    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    @Column(name = "weight")
    private Float weight;
    @Column(name = "breed")
    private String breed;
    @Column(name = "color")
    private String color;
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "simple_owner_id")
    private SimpleOwner simpleOwner;

    @Override
    public int compareTo(Pet other) {
        return this.name.compareTo(other.name);
    }
}
