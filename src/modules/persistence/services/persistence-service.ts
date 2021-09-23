import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import DocumentStore from "ravendb";
import { Guid } from "typescript-guid";
import { TestDto } from "../dto";

@Injectable()
export class PersistenceService {
  private documentStore: DocumentStore;

  constructor(private readonly config: ConfigService) {
    this.documentStore = new DocumentStore(this.config.get('db.raven.url'), this.config.get('db.raven.database'));
    
    this.documentStore.conventions.registerEntityType(TestDto, "TestDtos");
    this.documentStore.initialize();
  }

  public async storeDocument(entity: TestDto): Promise<TestDto> {
    const session = this.documentStore.openSession();

    const dashRegex = /-/g;
    const onlyAlphaNumeric = /[\w\d]+/g;

    let data = TestDto.name;
    let buff = Buffer.from(data);
    let base64data = buff.toString('base64');

    const firstPart = `${onlyAlphaNumeric.exec(base64data)[0]}`;
    const guidPart = Guid.create().toString().replace(dashRegex, "");
    const stamp = (new Date()).getTime();

    const id = `${firstPart}_${guidPart}_${stamp}`;

    await session.store(entity, id, { documentType: TestDto });
    await session.saveChanges();

    session.dispose();

    return entity;
  }

  public async retrieveTests(): Promise<TestDto[]> {
    const session = this.documentStore.openSession();

    const results = await session.query({
      collection: "TestDtos",
      documentType: TestDto,
    })//.selectFields(['cucu', 'birth', 'major', 'id'])
    .all();

    session.dispose();

    return results.map(obj => {
      const conv = obj as TestDto;

      delete conv["__PROJECTED_NESTED_OBJECT_TYPES__"];
      delete conv["@metadata"];

      return conv;
    });
  }
}