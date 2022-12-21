export const orphanFCDA = `<FCDA />`;

export const orphanDataSet = `
    <DataSet name="someDatSet">
        <FCDA />
    </DataSet>
    <GSEControl name="someCbName" datSet="someDatSet" />
    `;

export const orphanControlBlock = `
    <GSEControl name="someCbName" datSet="someDatSet" />
    `;

export const singleIedWithCtrlBlocks = `
    <SCL version="2007">
    <IED name="someIED">
        <AccessPoint name="someAP">
            <Server>
                <LDevice inst="someLDevice">
                    <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                        <GSEControl name="gseControl" />
                        <SampledValueControl name="smvControl" />
                    </LN0>
                    <LN0 prefix="II_" lnClass="PTOC" inst="1" lnType="someLnType">
                        <ReportControl name="rpControl" />
                    </LN0>
                </LDevice>
            </Server>
        </AccessPoint>
    </IED>`;

export const ed2Subscription = `
    <SCL version="2007">
    <IED name="sinkIED">
        <AccessPoint name="someAP">
            <Server>
                <LDevice inst="someLDevice">
                    <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                        <Inputs desc="GSE">
                            <ExtRef 
                                iedName="srcIED" 
                                ldInst="someLDInst" 
                                lnClass="LLN0" 
                                doName="Op" 
                                daName="general"
                                srcLDInst="someLDInst"
                                srcPrefix=""
                                srcLNClass="LLN0"
                                srcLNInst=""
                                srcCBName="someGse"
                                serviceType="GOOSE" />
                            <ExtRef 
                                iedName="srcIED" 
                                ldInst="someLDInst" 
                                lnClass="LLN0" 
                                doName="Op" 
                                daName="q"
                                serviceType="Poll" />
                            <ExtRef 
                                iedName="srcIED" 
                                ldInst="someLDInst" 
                                lnClass="LLN0" 
                                doName="Beh" 
                                daName="stVal"
                                srcPrefix=""
                                srcLDInst="someLDInst"
                                srcLNClass="LLN0"
                                srcCBName="someGse2"
                                serviceType="GOOSE" />
                            <ExtRef 
                                iedName="srcIED" 
                                ldInst="someLDInst" 
                                lnClass="LLN0" 
                                doName="Beh" 
                                daName="q"
                                srcLDInst="someLDInst"
                                srcLNClass="PTOC"
                                srcLNInst="1"
                                srcCBName="someRp"
                                serviceType="Report" />
                        </Inputs>
                    </LN0>
                    <LN prefix="" lnClass="PTOC" lnInst="1" lnType="pTOClnType">
                        <Inputs desc="SMV">
                            <ExtRef 
                                iedName="srcIED" 
                                ldInst="smvLDInst"
                                prefix="L1"
                                lnClass="TCTR"
                                lnInst="1" 
                                doName="A.phsA" 
                                daName="AmpSv.instMag.i"
                                srcLDInst="someLDInst"
                                srcPrefix=""
                                srcLNClass="LLN0"
                                srcLNInst=""
                                srcCBName="someSmv"
                                serviceType="SMV" />
                            <ExtRef 
                                iedName="srcIED" 
                                ldInst="smvLDInst" 
                                prefix="L1"
                                lnClass="TVTR"
                                lnInst="1" 
                                doName="PhV.phsA" 
                                daName="VolSv.instMag.i"
                                srcLDInst="someLDInst"
                                srcLNClass="LLN0"
                                srcCBName="someSmv"
                                serviceType="SMV" />
                        </Inputs>
                    </LN>
                </LDevice>
                <LDevice inst="smvSupervision">
                <LN lnClass="LSVS" inst="1" lnType="someLSVSType">
                    <DOI name="SvCBRef">
                        <DAI name="setSrcRef">
                            <Val>srcIEDsomeLDInst/LLN0.someSmv</Val>
                        </DAI>
                    </DOI>
                </LN>
            </LDevice>
            <LDevice inst="gseSupervision">
                <LN lnClass="LGOS" inst="1" lnType="someLGOSType">
                    <DOI name="GoCBRef">
                        <DAI name="setSrcRef">
                            <Val>srcIEDsomeLDInst/LLN0.someGse</Val>
                        </DAI>
                    </DOI>
                </LN>
                <LN lnClass="LGOS" inst="2" lnType="someLGOSType">
                    <Private type="OpenSCD.create" />
                    <DOI name="GoCBRef">
                        <DAI name="setSrcRef">
                            <Val>srcIEDsomeLDInst/LLN0.someGse2</Val>
                        </DAI>
                    </DOI>
                </LN>           
            </LDevice>
            </Server>
        </AccessPoint>
    </IED>
    <IED name="srcIED">
        <AccessPoint name="someAP">
            <Server>
                <LDevice inst="someLDInst">
                    <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                        <DataSet name="gseDatSet">
                            <FCDA 
                                ldInst="someLDInst" 
                                prefix="" 
                                lnClass="LLN0" 
                                lnInst="" 
                                doName="Op" 
                                daName="general" 
                                fc="ST" />
                            <FCDA 
                                ldInst="someLDInst" 
                                prefix="" 
                                lnClass="LLN0" 
                                lnInst="" 
                                doName="Op" 
                                daName="q" 
                                fc="ST" />
                            <FCDA 
                                ldInst="someLDInst" 
                                lnClass="LLN0" 
                                doName="Beh" 
                                daName="stVal" 
                                fc="ST" />
                            <FCDA 
                                ldInst="someLDInst" 
                                prefix="" 
                                lnClass="LLN0" 
                                lnInst="" 
                                doName="Beh" 
                                daName="q" 
                                fc="ST" />
                        </DataSet>
                        <DataSet name="smvDataSet">
                            <FCDA 
                                ldInst="smvLDInst" 
                                prefix="L1" 
                                lnClass="TCTR" 
                                lnInst="1" 
                                doName="A.phsA" 
                                daName="AmpSv.instMag.i" 
                                fc="MX" />
                            <FCDA 
                                ldInst="smvLDInst" 
                                prefix="L1" 
                                lnClass="TVTR" 
                                lnInst="1" 
                                doName="PhV.phsA" 
                                daName="VolSv.instMag.i" 
                                fc="MX" />
                        </DataSet>
                        <GSEControl name="someGse" datSet="gseDatSet"/>
                        <GSEControl name="someGse2" datSet="gseDatSet"/>
                        <GSEControl name="someGse3" datSet="gseDatSet"/>
                        <GSEControl name="someGse4" />
                        <SampledValueControl name="someSmv" datSet="smvDataSet"/>
                    </LN0>
                    <LN prefix="" lnClass="PTOC" inst="1" lnType="someLnType">
                        <DataSet name="rpDatSet">
                            <FCDA 
                                ldInst="someLDInst" 
                                prefix="" 
                                lnClass="LLN0" 
                                lnInst="" 
                                doName="Op" 
                                daName="general" 
                                fc="ST" />
                            <FCDA 
                                ldInst="someLDInst" 
                                prefix="" 
                                lnClass="LLN0" 
                                lnInst="" 
                                doName="Op" 
                                daName="q" 
                                fc="ST" />
                            <FCDA 
                                ldInst="someLDInst" 
                                lnClass="LLN0" 
                                doName="Beh" 
                                daName="stVal" 
                                fc="ST" />
                            <FCDA 
                                ldInst="someLDInst" 
                                prefix="" 
                                lnClass="LLN0" 
                                lnInst="" 
                                doName="Beh" 
                                daName="q" 
                                fc="ST" />
                        </DataSet>
                        <ReportControl name="someRp" datSet="rpDatSet" />
                        <ReportControl name="someRp1" datSet="rpDatSet" />
                    </LN>
                </LDevice>
            </Server>
        </AccessPoint>
    </IED>
    <DataTypeTemplates>
    <LNodeType id="someLGOSType" lnClass="LGOS">
        <DO name="GoCBRef" type="someGseORG"/>
    </LNodeType>
    <LNodeType id="someLSVSType" lnClass="LSVS">
        <DO name="SvCBRef" type="someSmvORG"/>
    </LNodeType>
    <DOType cdc="ORG" id="someGseORG">
        <DA name="setSrcRef" valImport="true" valKind="RO" />
    </DOType>
    <DOType cdc="ORG" id="someSmvORG">
        <DA name="setSrcRef" />
    </DOType>
</DataTypeTemplates>
</SCL`;

export const unconnectedData = `
<LN0 lnClass="LLN0" inst="">
    <DataSet name="someName">
        <FCDA />
    </DataSet>
</LN0>`;

export const connectedData = `
<LN0 lnClass="LLN0" inst="">
    <DataSet name="someName">
        <FCDA />
    </DataSet>
    <ReportControl name="rp1" datSet="someName"/>
    <GSEControl name="g1" datSet="someName"/>
    <GSEControl name="g2" datSet="someOtherName"/>
    <SampledValueControl name="sv1" datSet="someName"/>
</LN0>`;
